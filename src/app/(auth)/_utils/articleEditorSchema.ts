import { z } from "zod";

export const articleEditorSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z
    .string()
    .min(1, "文章は必須です")
    .max(140, "文章は140文字以内で入力してください"),
});
