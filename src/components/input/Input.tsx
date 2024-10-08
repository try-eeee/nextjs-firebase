"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  register?: UseFormRegisterReturn;
}

export function Input(props: InputProps) {
  const { register, ...rest } = props;
  return <input {...register} {...rest} className={styles.input} />;
}
