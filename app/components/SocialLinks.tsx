const socialProfiles = [
  {
    name: "TikTok",
    handle: "@deshenghengxin",
    href: "https://www.tiktok.com/@deshenghengxin",
  },
] as const;

export const officialSocialProfileUrls = socialProfiles.map((profile) => profile.href);

type SocialLinksProps = {
  variant?: "footer" | "contact";
};

export function SocialLinks({ variant = "footer" }: SocialLinksProps) {
  return (
    <div className={`social-links social-links-${variant}`} aria-label="Official Deesheng Food social media">
      {socialProfiles.map((profile) => (
        <a
          className="social-link"
          href={profile.href}
          key={profile.name}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Deesheng Food on ${profile.name}`}
        >
          <span className="social-link-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12.53 0h3.91c.08 1.53.63 3.09 1.75 4.17a7.42 7.42 0 0 0 4.24 1.79v4.03a11.18 11.18 0 0 1-4.2-.97 10.7 10.7 0 0 1-1.62-.93c-.01 2.92.01 5.84-.02 8.75a7.32 7.32 0 0 1-1.35 3.94 7.4 7.4 0 0 1-5.91 3.21 7.23 7.23 0 0 1-4.08-1.03 7.53 7.53 0 0 1-3.65-5.72c-.03-.5-.04-1-.01-1.49a7.5 7.5 0 0 1 2.58-4.96 7.38 7.38 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.36 3.36 0 0 0-2.98.37 3.3 3.3 0 0 0-1.14 1.88 3.27 3.27 0 0 0 .63 1.87c.5.45 1.21.66 1.88.58a2.6 2.6 0 0 0 2.27-2.56c.02-6.57 0-13.14.01-19.71Z" />
            </svg>
          </span>
          <span className="social-link-copy">
            <strong>{profile.name}</strong>
            <small>{profile.handle}</small>
          </span>
          <span className="social-link-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
