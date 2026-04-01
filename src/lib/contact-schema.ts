import { z } from 'zod';

export const contactFormSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(2, '제목은 2자 이상 입력해 주세요.')
    .max(120, '제목은 120자 이하로 입력해 주세요.'),
  message: z
    .string()
    .trim()
    .min(10, '문의 내용은 10자 이상 입력해 주세요.')
    .max(5000, '문의 내용이 너무 깁니다.'),
  company: z.string().trim().optional(),
});
