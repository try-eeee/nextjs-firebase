import React from "react";
import { render } from "@testing-library/react";
import { MainLayout } from "@/components/mainLayout/MainLayout";

describe("MainLayout UnitTest", () => {
  test("Snapshot Test Of MainLayout", () => {
    const { asFragment } = render(
      <MainLayout>
        <>コンテンツ</>
      </MainLayout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
