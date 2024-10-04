import React from "react";
import { render } from "@testing-library/react";
import { CheckBoxWithLabel } from "@/components/checkBoxWithLabel/CheckBoxWithLabel";

describe("CheckBoxWithLabel UnitTest", () => {
  test("Snapshot Test Of CheckBoxWithLabel", () => {
    const { asFragment } = render(
      <CheckBoxWithLabel>
        <>
          利用規約に同意する 利用規約は
          <a href="#" target="_blank" rel="noopener noreferrer">
            こちら
          </a>
        </>
      </CheckBoxWithLabel>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
