import React from "react";
import { render } from "@testing-library/react";
import { Label } from "@/components/label/Label";

describe("Label UnitTest", () => {
  test("Snapshot Test Of Label", () => {
    const { asFragment } = render(
      <Label htmlFor="lastName" align="center" required>
        姓
      </Label>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
