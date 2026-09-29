"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { attributedContactUrl, getInquirySource } from "../lib/inquiry-source";

const originalLinks = new WeakMap<HTMLAnchorElement, string>();

export function InquiryAttribution() {
  const pathname = usePathname();
  useEffect(() => {
    function annotate(anchor: HTMLAnchorElement) {
      const original = originalLinks.get(anchor) || anchor.href;
      originalLinks.set(anchor, original);
      anchor.href = attributedContactUrl(original, getInquirySource(), location.pathname);
    }
    getInquirySource();
    document.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/8615621089573"], a[href^="mailto:info@deesheng.food"]').forEach(annotate);
    function beforeContact(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="https://wa.me/8615621089573"], a[href^="mailto:info@deesheng.food"]');
      if (anchor) annotate(anchor);
    }
    document.addEventListener("click", beforeContact, true);
    document.addEventListener("auxclick", beforeContact, true);
    return () => {
      document.removeEventListener("click", beforeContact, true);
      document.removeEventListener("auxclick", beforeContact, true);
    };
  }, [pathname]);
  return null;
}
