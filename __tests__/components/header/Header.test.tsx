import React from "react";
import { render } from "@testing-library/react";
import { Header } from "@/components/header/Header";

describe("Header UnitTest", () => {
  test("Snapshot Test Of Header", () => {
    const { asFragment } = render(
      <Header
        uid="aaaa"
        user={{
          lastNameKana: "テスト",
          firstNameKana: "タロウ",
          iconURL: "http://xxxxx.com",
        }}
        title="タイトル"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
