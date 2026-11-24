import { ExportCta } from "./ExportCta";

type ContactLinksProps = {
  variant?: "footer" | "contact";
};

export function ContactLinks({ variant = "footer" }: ContactLinksProps) {
  return (
    <div className={`contact-links contact-links-${variant}`} aria-label="NexusPoint international export and private-label desk">
      <ExportCta className="social-link contact-channel-link" data-platform="export-desk">
        <span className="social-link-copy">
          <strong>NexusPoint export desk</strong>
          <small>Quotation, samples & OEM</small>
        </span>
      </ExportCta>
    </div>
  );
}
