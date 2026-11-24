const exportRanges: Record<string, { href: string; anchor: string }> = {
  home: { href: "https://nexuspointtrade.com/", anchor: "NexusPoint Food Trade" },
  "korean-sauces": { href: "https://nexuspointtrade.com/food/shelf-stable-sauces", anchor: "NexusPoint Food Trade’s Korean sauce export desk" },
  kimchi: { href: "https://nexuspointtrade.com/food/kimchi", anchor: "NexusPoint Food Trade’s kimchi export desk" },
  "chili-seasonings": { href: "https://nexuspointtrade.com/food/dried-chili-seasonings", anchor: "NexusPoint Food Trade’s chili powder and seasonings export desk" },
  "frozen-vegetables": { href: "https://nexuspointtrade.com/food/frozen-fruit-vegetables", anchor: "NexusPoint Food Trade’s frozen vegetable export desk" },
  halal: { href: "https://nexuspointtrade.com/quality#halal-certification", anchor: "NexusPoint Food Trade’s HALAL certification and export support" },
};

export function ExportPartnerIntro({ range = "home" }: { range?: string }) {
  const destination = exportRanges[range];
  if (!destination) return null;
  return (
    <p className="export-partner-intro">
      For international private-label contracting, custom retail/HORECA packaging and
      FOB Qingdao consolidation, submit your brief through our official export partner{" "}
      <a href={destination.href}>{destination.anchor}</a>.
    </p>
  );
}
