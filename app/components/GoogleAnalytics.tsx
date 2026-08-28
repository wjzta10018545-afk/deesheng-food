"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-KJY4L6SDBZ";
const CONSENT_STORAGE_KEY = "deesheng.analytics-consent";

type ConsentChoice = "granted" | "denied";
type ConsentState = ConsentChoice | "pending" | null;
type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    deeshengAnalyticsReady?: boolean;
  }
}

function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function saveConsent(value: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Analytics remains usable for the current page when storage is unavailable.
  }
}

function initializeAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));

  if (window.deeshengAnalyticsReady) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.deeshengAnalyticsReady = true;
}

export function trackAnalyticsEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || readConsent() !== "granted") return;
  window.gtag?.("event", eventName, {
    page_path: window.location.pathname,
    ...params,
  });
}

function classifyLink(anchor: HTMLAnchorElement) {
  const platform = anchor.dataset.platform;
  if (platform === "whatsapp") return { eventName: "whatsapp_click", params: { channel: "whatsapp" } };
  if (platform === "email") return { eventName: "email_click", params: { channel: "email" } };
  if (platform === "facebook") return { eventName: "facebook_click", params: { channel: "facebook" } };
  if (platform === "tiktok") return { eventName: "tiktok_click", params: { channel: "tiktok" } };

  const url = new URL(anchor.href, window.location.href);
  if (url.origin === window.location.origin && url.pathname === "/contact") {
    return { eventName: "quote_click", params: { channel: "contact_page" } };
  }
  if (anchor.hasAttribute("download") || url.pathname.startsWith("/downloads/")) {
    return { eventName: "catalog_download", params: { asset_type: "product_catalogue" } };
  }
  return null;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const savedConsent = readConsent();
    if (savedConsent === "granted") initializeAnalytics();
    const frame = window.requestAnimationFrame(() => setConsent(savedConsent ?? "pending"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    initializeAnalytics();
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [consent, pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      if (event.target.closest("[data-analytics-settings]")) {
        setConsent("pending");
        return;
      }

      if (consent !== "granted") return;
      const anchor = event.target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const analyticsEvent = classifyLink(anchor);
      if (analyticsEvent) trackAnalyticsEvent(analyticsEvent.eventName, analyticsEvent.params);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [consent]);

  function allowAnalytics() {
    saveConsent("granted");
    initializeAnalytics();
    setConsent("granted");
  }

  function declineAnalytics() {
    saveConsent("denied");
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setConsent("denied");
  }

  if (consent !== "pending") return null;

  return (
    <aside className="analytics-consent" role="dialog" aria-label="Analytics privacy choices">
      <div>
        <strong>Analytics &amp; privacy</strong>
        <p>
          We use Google Analytics only if you allow it, to measure visits and inquiry-button clicks.
          Form entries are never sent to Analytics.
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button className="button button-primary" type="button" onClick={allowAnalytics}>Allow analytics</button>
        <button className="analytics-decline" type="button" onClick={declineAnalytics}>Decline</button>
      </div>
    </aside>
  );
}
