import { z } from 'zod';

export const memberSchema = z.object({
    businessName: z.string().min(2, 'Tên doanh nghiệp phải có ít nhất 2 ký tự').max(100, 'Tên doanh nghiệp không được quá 100 ký tự'),
    representativeName: z.string().min(2, 'Tên người đại diện phải có ít nhất 2 ký tự').max(50, 'Tên người đại diện không được quá 50 ký tự'),
});

export type MemberFormValues = z.infer<typeof memberSchema>;
