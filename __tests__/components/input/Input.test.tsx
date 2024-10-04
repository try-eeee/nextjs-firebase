import React from "react";
import { render } from "@testing-library/react";
import { Input } from "@/components/input/Input";

describe("Input UnitTest", () => {

  test("Snapshot Test Of Input", () => {
    const { asFragment } = render(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });
});
