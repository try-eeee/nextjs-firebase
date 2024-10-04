import React from "react";
import { render } from "@testing-library/react";
import { RegisterForm } from "@/app/(general)/register/_components/RegisterForm";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/(general)/actions", () => ({
  createUser: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
}));

describe("RegisterForm UnitTest", () => {
  test("Snapshot Test Of RegisterForm", () => {
    const { asFragment } = render(<RegisterForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
