#!/usr/bin/env python3
"""Read-only export-desk verification; Python standard library only."""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urljoin, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
import xml.etree.ElementTree as ET

CANONICAL = "https://deesheng.food"
EXPORT = "https://nexuspointtrade.com"
DEPARTMENT = {"@type": "Organization", "name": "NexusPoint Food Trade (International Export & Private-Label Desk)", "url": EXPORT + "/", "email": "info@nexuspointtrade.com"}
BANNER = "International Export, OEM & Private-Label Desk — Managed by NexusPoint (nexuspointtrade.com) · U.S. & China Contracting · FOB Qingdao"
NOTE = "Direct export quotation, OEM Studio & consolidated FOB Qingdao shipping handled by our export desk at NexusPoint (nexuspointtrade.com)."
EDITORIAL = dict(zip(["/", "/products/korean-sauces/", "/products/kimchi/", "/products/chili-seasonings/", "/products/frozen-vegetables/", "/halal-korean-sauce-manufacturer/"], [EXPORT + suffix for suffix in ["/", "/food/shelf-stable-sauces", "/food/kimchi", "/food/dried-chili-seasonings", "/food/frozen-fruit-vegetables", "/quality#halal-certification"]]))
VOID = set("area base br col embed hr img input link meta param source track wbr".split())
norm = lambda value: " ".join(value.split())

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.anchors, self.jsonld, self.visible, self.h1, self.editorial, self.robots = [], [], [], [], [], [], []
        self.canonical, self.forms = "", 0
    def inside(self, tag=None, cls=None):
        return any((not tag or f["tag"] == tag) and (not cls or cls in f["attrs"].get("class", "").split()) for f in self.stack)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        frame = {"tag": tag, "attrs": attrs, "text": []}
        if tag == "link" and self.inside("head") and "canonical" in attrs.get("rel", "").split(): self.canonical = attrs.get("href", "")
        if tag == "meta" and self.inside("head") and attrs.get("name", "").lower() in ("robots", "googlebot"): self.robots.append(attrs.get("content", ""))
        if tag == "script": frame["jsonld"] = self.inside("head") and attrs.get("type") == "application/ld+json"
        if tag == "p" and "export-partner-intro" in attrs.get("class", "").split():
            frame["editorial"] = []; self.editorial.append(frame["editorial"])
        if tag == "a":
            frame["anchor"] = {"href": attrs.get("href", ""), "rel": attrs.get("rel", ""), "text": [], "banner": self.inside(cls="export-announcement"), "cta": self.inside(cls="export-cta")}
            self.anchors.append(frame["anchor"])
            for ancestor in self.stack:
                if "editorial" in ancestor: ancestor["editorial"].append(frame["anchor"])
        if tag == "form": self.forms += 1
        if tag not in VOID: self.stack.append(frame)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index]["tag"] == tag:
                for frame in self.stack[index:]:
                    if frame.get("jsonld"): self.jsonld.append("".join(frame["text"]))
                del self.stack[index:]; break
    def handle_data(self, data):
        if self.inside("script"):
            self.stack[-1]["text"].append(data); return
        if self.inside("head") or self.inside("style") or self.inside("template"): return
        self.visible.append(data)
        if self.inside("h1"): self.h1.append(data)
        for frame in self.stack:
            if "anchor" in frame: frame["anchor"]["text"].append(data)

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, new_url): return None

def fetch(url, timeout):
    try:
        request = Request(url, headers={"User-Agent": "Deesheng-Export-Desk-Verification/1.0"})
        with build_opener(NoRedirect()).open(request, timeout=timeout) as response:
            raw = response.read()
            return {"status": response.status, "final_url": response.geturl(), "content_type": response.headers.get("Content-Type", ""), "bytes": len(raw), "body": raw.decode(response.headers.get_content_charset() or "utf-8", errors="replace")}
    except HTTPError as exc: return {"status": exc.code, "final_url": exc.geturl(), "redirect_location": exc.headers.get("Location"), "error": str(exc)}
    except (URLError, TimeoutError, OSError) as exc: return {"status": None, "final_url": url, "error": str(exc)}

def followed(anchor): return not set(anchor["rel"].lower().split()) & {"nofollow", "sponsored", "ugc"}
def destination(anchor, medium, path):
    url = urlsplit(anchor["href"]); query = parse_qs(url.query)
    return f"{url.scheme}://{url.netloc}" == EXPORT and url.path == path and all(query.get(k) == [v] for k, v in {"utm_source": "deesheng_food", "utm_medium": medium, "utm_campaign": "export_desk"}.items()) and followed(anchor)

def check_page(expected, body):
    page = Page(); page.feed(body); page.close(); errors = []
    check = lambda condition, message: errors.append(message) if not condition else None
    check(page.canonical == expected["canonical"], "Original canonical changed")
    check(norm(" ".join(page.h1)) == expected["h1"], "Original H1 changed")
    check(not any(re.search(r"\b(noindex|nofollow)\b", value, re.I) for value in page.robots), "Page robots prohibits indexing/link following")
    nodes = []
    for raw in page.jsonld:
        try:
            data = json.loads(raw); nodes.extend(data if isinstance(data, list) else data.get("@graph", [data]))
        except (ValueError, AttributeError): errors.append("Invalid head JSON-LD")
    check(any(isinstance(n, dict) and n.get("@type") == "Organization" and n.get("@id") == CANONICAL + "/#organization" and n.get("department") == DEPARTMENT for n in nodes), "Exact head Organization.department missing")
    banners = [a for a in page.anchors if a["banner"]]; ctas = [a for a in page.anchors if a["cta"]]
    check(len(banners) == 1 and all(destination(a, "banner", "/") and norm(" ".join(a["text"])) == BANNER for a in banners), "Banner text, destination, UTM or dofollow failed")
    check(len(ctas) >= 4 and all(destination(a, "cta", "/request") for a in ctas), "CTA coverage, destination, UTM or dofollow failed")
    visible = norm(" ".join(page.visible)); check(NOTE in visible, "Export-desk explanation missing")
    check(not re.search(r"Play\s+MAMAZAN|mamazan-legend|nexuspointapparel\.com|\b(apparel|knitwear)\b", visible, re.I), "Unrelated game/apparel text remains")
    for anchor in page.anchors:
        url = urlsplit(urljoin(expected["url"], anchor["href"]))
        check(url.netloc not in {"mamazan-legend.vercel.app", "nexuspointapparel.com"}, "Unrelated game/apparel link remains")
        check(not (url.netloc == "deesheng.food" and url.path.rstrip("/") == "/contact") and not anchor["href"].startswith(("https://wa.me/8615621089573", "mailto:info@deesheng.food")), "Old conversion route remains")
    path = urlsplit(expected["url"]).path
    if path in EDITORIAL:
        links = page.editorial[0] if len(page.editorial) == 1 else []
        check(len(links) == 1 and links[0]["href"] == EDITORIAL[path] and followed(links[0]) and "NexusPoint Food Trade" in norm(" ".join(links[0]["text"])), "Precise followed editorial mapping failed")
    if path == "/contact/": check(page.forms == 0, "Old contact form remains")
    return errors, {"canonical": page.canonical, "h1": norm(" ".join(page.h1)), "cta_count": len(ctas), "editorial_count": len(page.editorial)}

def main():
    script = Path(__file__).resolve(); parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--origin", default=CANONICAL); parser.add_argument("--baseline", type=Path)
    parser.add_argument("--output", type=Path, default=Path("live-verification.json")); parser.add_argument("--timeout", type=float, default=25)
    args = parser.parse_args(); candidates = [script.parent.parent / "tests/fixtures/export-desk-baseline-20261125.json", script.with_name("baseline.json")]
    selected = args.baseline or next((p for p in candidates if p.is_file()), candidates[0])
    try: baseline = json.loads(selected.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc: parser.error(f"Cannot read baseline: {exc}")
    origin = urlsplit(args.origin)
    if origin.scheme not in {"http", "https"} or not origin.netloc or origin.query or origin.fragment: parser.error("--origin requires an http(s) origin/staging root without query or fragment")
    urls = baseline["sitemap_urls"]; expected = {p["url"]: p for p in baseline["pages"]}
    if len(urls) != 54 or len(set(urls)) != 54: parser.error("Baseline must contain 54 unique original URLs")
    root = args.origin.rstrip("/") + "/"; jobs = [("page", u, urljoin(root, urlsplit(u).path.lstrip("/"))) for u in urls]
    jobs += [("game", CANONICAL + "/game/", urljoin(root, "game/")), ("sitemap", CANONICAL + "/sitemap.xml", urljoin(root, "sitemap.xml"))]; records = []
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = {pool.submit(fetch, u, args.timeout): (kind, canonical, u) for kind, canonical, u in jobs}
        for future in as_completed(futures):
            kind, canonical, url = futures[future]; result = future.result(); body = result.pop("body", ""); errors = []; evidence = {}
            if result["status"] != 200 or result["final_url"] != url: errors.append(f"HTTP {result['status']} or changed URL; redirects are not followed")
            else:
                try:
                    if kind == "page": errors, evidence = check_page(expected[canonical], body)
                    elif kind == "game" and not re.search(r"<html\b", body, re.I): errors.append("Retained game does not return HTML")
                    elif kind == "sitemap":
                        locations = [n.text.strip() for n in ET.fromstring(body).iter() if n.tag.rsplit("}", 1)[-1] == "loc" and n.text]
                        if len(locations) != 54 or set(locations) != set(urls): errors.append("Live sitemap route set changed")
                    if kind in {"page", "game"} and "text/html" not in result.get("content_type", "").lower(): errors.append("Response is not HTML")
                except Exception as exc: errors.append(f"Verification parsing failed: {exc}")
            records.append({"kind": kind, "url": canonical, "fetch_url": url, **result, **evidence, "passed": not errors, "failures": errors})
    order = {u: i for i, (_, u, _) in enumerate(jobs)}; records.sort(key=lambda r: order[r["url"]]); failed = [r for r in records if not r["passed"]]
    pages = [r for r in records if r["kind"] == "page"]; summary = {"original_pages": 54, "passed_pages": sum(r["passed"] for r in pages), "page_http_200": sum(r["status"] == 200 for r in pages), "checked_urls": len(records), "failed_urls": len(failed), "followed_attributed_ctas": sum(r.get("cta_count", 0) for r in pages)}
    report = {"verified_at_utc": datetime.now(timezone.utc).isoformat(), "fetch_root": root, "baseline": str(selected), "read_only": True, "redirects_followed": False, "concurrency": 5, "passed": not failed, "summary": summary, "results": records}
    args.output.parent.mkdir(parents=True, exist_ok=True); args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{'PASS' if not failed else 'FAIL'}: {summary['passed_pages']}/54 pages; {len(failed)} failed URLs; {summary['followed_attributed_ctas']} followed attributed CTAs. Report: {args.output}")
    for record in failed: print(f"  {record['url']}: {'; '.join(record['failures'])}", file=sys.stderr)
    return int(bool(failed))

if __name__ == "__main__": sys.exit(main())
