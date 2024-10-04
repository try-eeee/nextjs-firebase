import React, { createRef } from "react";
import { render } from "@testing-library/react";
import { ArticleEditorModal } from "@/app/(auth)/article/_components/ArticleEditorModal";
import { useDialog } from "@/components/dialog/Dialog";

jest.mock("@/app/(auth)/article/actions", () => ({
  createArticle: jest.fn(),
  updateArticle: jest.fn(),
  deleteArticle: jest.fn(),
}));

describe("ArticleEditorModal UnitTest", () => {
  const refArticleEditorModal = createRef<HTMLDialogElement>();

  test("Snapshot Test Of ArticleEditorModal", () => {
    const { asFragment } = render(
      <ArticleEditorModal
        operationType="view"
        aricleRegisterModal={refArticleEditorModal}
        uid="testUid"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
