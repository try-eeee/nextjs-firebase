import React from "react";
import { render } from "@testing-library/react";
import { BirthdayInput } from "@/components/birthdayInput/BirthdayInput";

describe("BirthdayInput UnitTest", () => {

  test("Snapshot Test Of BirthdayInput", () => {
    const { asFragment } = render(<BirthdayInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
