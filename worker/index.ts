/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const inquiryOrigins = new Set([
  "https://deesheng.food",
  "https://deesheng-food.wjzta10018545.chatgpt.site",
  "https://wjzta10018545-afk.github.io",
]);

function inquiryCors(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
    "Cache-Control": "no-store",
  };
}

function bounded(value: unknown, limit: number): string | null {
  return typeof value === "string" && value.length <= limit ? value.trim() : null;
}

async function recordInquiry(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") ?? "";
  if (!inquiryOrigins.has(origin)) return new Response("Forbidden", { status: 403 });
  const headers = inquiryCors(origin);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers });
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) {
    return Response.json({ error: "Expected JSON" }, { status: 415, headers });
  }
  let payload: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 8192) throw new Error("Too large");
    payload = JSON.parse(body);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid JSON");
  } catch {
    return Response.json({ error: "Invalid inquiry" }, { status: 400, headers });
  }
  const keys = {
    company: 120, country: 100, businessType: 80, product: 240,
    packing: 120, quantity: 120, channel: 120, message: 1200,
    landingPath: 240, source: 100, medium: 100, campaign: 120, referrerHost: 160,
  } as const;
  const values = Object.fromEntries(Object.entries(keys).map(([key, limit]) => [key, bounded(payload[key], limit)]));
  if (Object.values(values).some((value) => value === null) ||
      ["company", "country", "businessType", "product", "quantity"].some((key) => !values[key]) ||
      !values.landingPath?.startsWith("/")) {
    return Response.json({ error: "Check required fields" }, { status: 400, headers });
  }
  if (!env.DB) return Response.json({ error: "Inquiry recording unavailable" }, { status: 503, headers });

  const id = `DS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  try {
    await env.DB.prepare(`INSERT INTO inquiries
      (id, company, country, business_type, product, packing, quantity, channel, message,
       landing_path, source, medium, campaign, referrer_host)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
      id, values.company, values.country, values.businessType, values.product,
      values.packing, values.quantity, values.channel, values.message,
      values.landingPath, values.source, values.medium, values.campaign, values.referrerHost,
    ).run();
    return Response.json({ id, status: "prepared" }, { status: 201, headers });
  } catch (error) {
    console.error("Inquiry insert failed", error);
    return Response.json({ error: "Inquiry recording unavailable" }, { status: 503, headers });
  }
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/inquiries") return recordInquiry(request, env);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
