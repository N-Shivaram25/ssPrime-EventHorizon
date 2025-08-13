import { z } from "z";

// Event schema
export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  date: z.string(), // YYYY-MM-DD format
  startTime: z.string().nullable(), // HH:MM format
  endTime: z.string().nullable(), // HH:MM format
  color: z.string().default("#3B82F6"),
  createdAt: z.date().nullable(),
});

export const insertEventSchema = eventSchema.omit({
  id: true,
  createdAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = z.infer<typeof eventSchema>;

// User schema
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const insertUserSchema = userSchema.omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;
