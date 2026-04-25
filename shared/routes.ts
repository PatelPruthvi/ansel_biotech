import { z } from 'zod';
import { insertContactInquirySchema } from './schema';

export type ContactInquiryInput = z.infer<typeof insertContactInquirySchema>;
