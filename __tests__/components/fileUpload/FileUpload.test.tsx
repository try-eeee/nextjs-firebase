import React from "react";
import { render } from "@testing-library/react";
import { FileUpload } from "@/components/fileUpload/FileUpload";

describe("FileUpload UnitTest", () => {
  test("Snapshot Test Of FileUpload", () => {
    const { asFragment } = render(
      <FileUpload
        setFile={() => {}}
        handleUploadImage={() => {}}
        handleRemoved={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
