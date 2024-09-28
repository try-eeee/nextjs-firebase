import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./CheckBoxWithLabel.module.scss";

interface CheckBoxWithLabelProps
  extends React.ComponentPropsWithoutRef<"input"> {
  children: React.ReactNode;
  register?: UseFormRegisterReturn;
}

export function CheckBoxWithLabel(props: CheckBoxWithLabelProps) {
  const { children, register, ...rest } = props;
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" {...register} {...rest} />
      <span className="label">{children}</span>
    </label>
  );
}
