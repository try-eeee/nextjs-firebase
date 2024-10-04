import React from "react";
import { render } from "@testing-library/react";
import { Dialog } from "@/components/dialog/Dialog";

describe("Dialog UnitTest", () => {
  test("Snapshot Test Of Dialog", () => {
    const { asFragment } = render(
      <Dialog handleOutside={() => {}}>
        <>コンテンツ</>
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
