import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "@/app/(general)/login/_components/LoginForm";

jest.mock("next/navigation", () => ({
  useRouter: () => {
    push: jest.fn();
  },
}));

describe("LoginForm UnitTest", () => {
  test("Snapshot Test Of LoginForm", () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
