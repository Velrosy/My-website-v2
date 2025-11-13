import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail").notNull(),
  category: text("category").notNull(), // web, art, game, uiux
  techStack: text("tech_stack").array().notNull(),
  liveUrl: text("live_url"),
  codeUrl: text("code_url"),
  role: text("role"),
  timeframe: text("timeframe"),
  whatILearned: text("what_i_learned"),
  featured: integer("featured").default(0),
  views: integer("views").default(0),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  views: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
