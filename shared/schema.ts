import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const crises = pgTable("crises", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  severity: integer("severity").notNull(), // 1-5 scale
  status: text("status").notNull(), // active, resolved
  aiConfidence: integer("ai_confidence").notNull(), // 0-100
  detectedAt: timestamp("detected_at").notNull(),
  imageUrl: text("image_url").notNull(),
  aiCategories: text("ai_categories").array().notNull(),
  metadata: jsonb("metadata").notNull()
});

export const nonprofits = pgTable("nonprofits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  logoUrl: text("logo_url").notNull(),
  verified: boolean("verified").notNull().default(false),
  metadata: jsonb("metadata").notNull()
});

export const funds = pgTable("funds", {
  id: serial("id").primaryKey(),
  crisisId: integer("crisis_id").notNull(),
  amount: integer("amount").notNull(), // in cents
  status: text("status").notNull(), // pending, distributed
  recipient: text("recipient").notNull(),
  distributedAt: timestamp("distributed_at")
});

export const insertCrisisSchema = createInsertSchema(crises).omit({ 
  id: true, 
  detectedAt: true 
});

export const insertNonprofitSchema = createInsertSchema(nonprofits).omit({ 
  id: true 
});

export const insertFundSchema = createInsertSchema(funds).omit({ 
  id: true,
  distributedAt: true
});

export type Crisis = typeof crises.$inferSelect;
export type InsertCrisis = z.infer<typeof insertCrisisSchema>;
export type Nonprofit = typeof nonprofits.$inferSelect;
export type InsertNonprofit = z.infer<typeof insertNonprofitSchema>;
export type Fund = typeof funds.$inferSelect;
export type InsertFund = z.infer<typeof insertFundSchema>;