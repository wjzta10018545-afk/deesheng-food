"use client";

import { useEffect } from "react";

export const INQUIRY_SOURCE_KEY = "deesheng.inquiry-source";

export type InquirySource = {
  landingPath: string;
  source: string;
  medium: string;
  campaign: string;
  referrerHost: string;
};

export function InquiryAttribution() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(INQUIRY_SOURCE_KEY)) return;
      const params = new URLSearchParams(location.search);
      const referrer = document.referrer ? new URL(document.referrer) : null;
      const externalReferrer = referrer?.hostname !== location.hostname ? referrer?.hostname ?? "" : "";
      const source: InquirySource = {
        landingPath: location.pathname,
        source: params.get("utm_source") || (externalReferrer ? externalReferrer : "direct"),
        medium: params.get("utm_medium") || (externalReferrer ? "referral" : "none"),
        campaign: params.get("utm_campaign") || "",
        referrerHost: externalReferrer,
      };
      sessionStorage.setItem(INQUIRY_SOURCE_KEY, JSON.stringify(source));
    } catch {
      // A visitor can still prepare a quote if browser storage is unavailable.
    }
  }, []);
  return null;
}
