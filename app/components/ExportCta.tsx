import type { AnchorHTMLAttributes, ReactNode } from "react";
import { EXPORT_DESK_NOTE, exportQuoteUrl } from "../lib/export-desk";

type ExportCtaProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  product?: string;
  note?: boolean;
};

export function ExportDeskNote() {
  return <small className="export-desk-note">{EXPORT_DESK_NOTE}</small>;
}

export function ExportCta({ children, product, note = true, ...anchorProps }: ExportCtaProps) {
  return (
    <span className="export-cta">
      <a {...anchorProps} href={exportQuoteUrl(product)}>{children}</a>
      {note && <ExportDeskNote />}
    </span>
  );
}
