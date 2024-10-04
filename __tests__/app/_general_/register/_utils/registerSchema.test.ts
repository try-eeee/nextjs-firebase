import {
  registerSchema,
  clientRegisterSchema,
} from "@/app/(general)/register/_utils/registerSchema";

describe("registerSchema", () => {
  const formData = {
    lastName: "山田",
    firstName: "太郎",
    lastNameKana: "ヤマダ",
    firstNameKana: "タロウ",
    gender: "男性",
    birthDate: "1990-01-01",
    email: "test@example.com",
    password: "password123",
    confirmPassword: "password123",
    agreement: true,
  };

  it("registerSchema validates successfully with correct data", async () => {
    const result = registerSchema.safeParse({
      lastName: "山田",
      firstName: "太郎",
      lastNameKana: "ヤマダ",
      firstNameKana: "タロウ",
      gender: "男性",
      birthDate: "1990-01-01",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      agreement: true,
    });
    expect(result.success).toBe(true);
  });

  const testCases = [
    { field: "lastName", value: "", errorMessage: "姓は必須です" },
    {
      field: "lastName",
      value: "３０文字以上３０文字以上３０文字以上３０文字以上３０文字以上３",
      errorMessage: "姓は30文字以内で入力してください",
    },
    { field: "firstName", value: "", errorMessage: "名は必須です" },
    {
      field: "firstName",
      value: "３０文字以上３０文字以上３０文字以上３０文字以上３０文字以上３",
      errorMessage: "名は30文字以内で入力してください",
    },
    { field: "lastNameKana", value: "", errorMessage: "セイは必須です" },
    {
      field: "lastNameKana",
      value: "３０文字以上３０文字以上３０文字以上３０文字以上３０文字以上３",
      errorMessage: "セイは30文字以内で入力してください",
    },
    { field: "firstNameKana", value: "", errorMessage: "メイは必須です" },
    {
      field: "firstNameKana",
      value: "３０文字以上３０文字以上３０文字以上３０文字以上３０文字以上３",
      errorMessage: "メイは30文字以内で入力してください",
    },
    { field: "gender", value: "", errorMessage: "姓別は必須です" },
    { field: "birthDate", value: "", errorMessage: "生年月日は必須です" },
    {
      field: "email",
      value: "",
      errorMessage: "メールアドレスは必須です",
    },
    {
      field: "email",
      value: "test11112222",
      errorMessage: "有効なメールアドレスを入力してください",
    },
    {
      field: "password",
      value: "",
      errorMessage: "パスワードは6文字以上である必要があります",
    },
    {
      field: "password",
      value: "6文字以下",
      errorMessage: "パスワードは6文字以上である必要があります",
    },
    {
      field: "confirmPassword",
      value: "",
      errorMessage: "確認用パスワードは6文字以上である必要があります",
    },
    {
      field: "confirmPassword",
      value: "6文字以下",
      errorMessage: "確認用パスワードは6文字以上である必要があります",
    },
    {
      field: "agreement",
      value: false,
      errorMessage: "利用規約に同意する必要があります",
    },
  ];

  test.each(testCases)(
    "registerSchema fails validation if $field is invalid",
    async ({ field, value, errorMessage }) => {
      const cotainField = field;

      const mockData = {
        ...formData,
        ...{ [cotainField]: value },
      };

      const result = registerSchema.safeParse(mockData);

      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(errorMessage);
    }
  );

  it("clientRegisterSchema validates successfully with correct data including isUploadImage", async () => {
    const result = clientRegisterSchema.safeParse({
      ...formData,
      isUploadImage: true,
    });
    expect(result.success).toBe(true);
  });

  it("clientRegisterSchema fails validation if isUploadImage is false", async () => {
    const result = clientRegisterSchema.safeParse({
      ...formData,
      isUploadImage: false,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("ユーザーアイコンは必須です");
  });
});
