import { z } from "zod";

export const insertContactInquirySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().min(1, "Message is required"),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = InsertContactInquiry & { id: number; createdAt: Date };
