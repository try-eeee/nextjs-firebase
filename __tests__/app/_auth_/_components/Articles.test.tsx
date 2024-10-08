import React from "react";
import { render } from "@testing-library/react";
import { Article } from "@/app/(auth)/_components/Articles";

jest.mock("@/app/(auth)/_components/ArticleEditorModal", () => ({
  ArticleEditorModal: () => <div>ArticleEditorModal</div>,
}));

describe("Articles UnitTest", () => {
  test("Snapshot Test Of Articles", () => {
    const { asFragment } = render(
      <Article
        uid="123"
        articles={[
          {
            authorId: "test123",
            articleId: "123",
            content: "記事内容123",
            createdAt: "",
            title: "記事タイトル123",
            isSelf: true,
          },
          {
            authorId: "test456",
            articleId: "456",
            content: "記事内容456",
            createdAt: "",
            title: "記事タイトル456",
            isSelf: false,
          },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
