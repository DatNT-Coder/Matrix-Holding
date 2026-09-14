import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(1, "Vui lòng nhập số điện thoại")
  .regex(/^(0|\+84)(3|5|7|8|9)\d{8}$/, "Số điện thoại không hợp lệ");

export const passwordSchema = z
  .string()
  .min(6, "Mật khẩu tối thiểu 6 ký tự")
  .max(50, "Mật khẩu quá dài");

export const emailSchema = z
  .string()
  .min(1, "Vui lòng nhập email")
  .email("Email không hợp lệ");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z.boolean().optional(),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirm: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    referral: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm"],
  });
export type RegisterForm = z.infer<typeof registerSchema>;

export const phoneOnlySchema = z.object({ phone: phoneSchema });
export type PhoneOnlyForm = z.infer<typeof phoneOnlySchema>;

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm"],
  });
export type NewPasswordForm = z.infer<typeof newPasswordSchema>;
