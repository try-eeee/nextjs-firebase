import React from "react";
import { render } from "@testing-library/react";
import { Button } from "@/components/button/Button";

describe("Button UnitTest", () => {

  test("Snapshot Test Of Button", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });
});
