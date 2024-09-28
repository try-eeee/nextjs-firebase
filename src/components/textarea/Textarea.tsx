import clsx from "clsx";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Textarea.module.scss";

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  register?: UseFormRegisterReturn;
}

export function Textarea(props: TextareaProps) {
  const { register, ...rest } = props;

  return <textarea {...register} {...rest} className={clsx(styles.textarea)} />;
}
