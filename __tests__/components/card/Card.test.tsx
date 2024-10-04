import React from "react";
import { render } from "@testing-library/react";
import { Card } from "@/components/card/Card";

describe("Card UnitTest", () => {
  test("Snapshot Test Of Card", () => {
    const { asFragment } = render(
      <Card title="新規登録">
        <>コンテンツ</>
      </Card>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
