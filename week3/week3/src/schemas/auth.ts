import { z } from 'zod';
import type { LoginFormValues, SignupFormValues } from '../types/auth';

export const loginSchema: z.ZodType<LoginFormValues> = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효하지 않은 이메일 형식입니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

const signupBaseSchema: z.ZodType<SignupFormValues> = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해주세요.'),
  nickname: z.string().trim().min(1, '닉네임을 입력해주세요.'),
});

export const signupSchema = signupBaseSchema.refine(
  (values) => values.password === values.passwordConfirm,
  {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  }
);
