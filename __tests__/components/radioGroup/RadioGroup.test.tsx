import React from "react";
import { render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { RadioGroup } from "@/components/radioGroup/RadioGroup";

describe("RadioGroup UnitTest", () => {
  const reactHookFormMock = renderHook(() =>
    useForm<{ gender: string }>({ defaultValues: { gender: "" } })
  );
  const { register } = reactHookFormMock.result.current;

  test("Snapshot Test Of RadioGroup", () => {
    const { asFragment } = render(
      <RadioGroup
        register={register("gender")}
        options={[
          { value: "male", label: "男性" },
          { value: "female", label: "女性" },
          { value: "other", label: "その他" },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
