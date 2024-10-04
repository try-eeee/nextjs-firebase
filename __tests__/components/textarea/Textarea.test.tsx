import React from "react";
import { render } from "@testing-library/react";
import { Textarea } from "@/components/textarea/Textarea";

describe("Textarea UnitTest", () => {

  test("Snapshot Test Of Textarea", () => {
    const { asFragment } = render(<Textarea />);
    expect(asFragment()).toMatchSnapshot();
  });
});
