import { z } from "zod";

export const registerSchema = z.object({
  lastName: z
    .string()
    .min(1, "姓は必須です")
    .max(30, "姓は30文字以内で入力してください"),
  firstName: z
    .string()
    .min(1, "名は必須です")
    .max(30, "名は30文字以内で入力してください"),
  lastNameKana: z
    .string()
    .min(1, "セイは必須です")
    .max(30, "セイは30文字以内で入力してください"),
  firstNameKana: z
    .string()
    .min(1, "メイは必須です")
    .max(30, "メイは30文字以内で入力してください"),
  gender: z.string().min(1, "姓別は必須です"),
  birthDate: z.string().min(1, "生年月日は必須です"),
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
  confirmPassword: z
    .string()
    .min(6, "確認用パスワードは6文字以上である必要があります"),
  agreement: z.boolean().refine((val) => val === true, {
    message: "利用規約に同意する必要があります",
  }),
});

export const clientRegisterSchema = registerSchema
  .extend({
    isUploadImage: z.boolean().refine((val) => val === true, {
      message: "ユーザーアイコンは必須です",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードと確認用パスワードが一致しません",
    path: ["confirmPassword"],
  });
