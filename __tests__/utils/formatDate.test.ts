import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
  test("success", () => {
    expect(formatDate("2024-02-01T12:00:00Z")).toStrictEqual("2024/02/01");
  });

  test("undefined", () => {
    expect(formatDate("")).toStrictEqual(undefined);
  });
});
