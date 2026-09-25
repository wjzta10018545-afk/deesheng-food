import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  company: text("company").notNull(),
  country: text("country").notNull(),
  businessType: text("business_type").notNull(),
  product: text("product").notNull(),
  packing: text("packing").notNull(),
  quantity: text("quantity").notNull(),
  channel: text("channel").notNull(),
  message: text("message").notNull(),
  landingPath: text("landing_path").notNull(),
  source: text("source").notNull(),
  medium: text("medium").notNull(),
  campaign: text("campaign").notNull(),
  referrerHost: text("referrer_host").notNull(),
  status: text("status").notNull().default("prepared"),
});
