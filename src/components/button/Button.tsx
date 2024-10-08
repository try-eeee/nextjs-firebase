"use client";

import styles from "./Button.module.scss";

type BUTTON_TYPES = "default" | "danger";
type BUTTON_SIZE = "size-S" | "size-M" | "size-L";

interface InputProps extends React.ComponentProps<"button"> {
  buttonType?: BUTTON_TYPES;
  buttonSize?: BUTTON_SIZE;
}

export function Button(props: InputProps) {
  const { buttonType = "default", buttonSize = "size-S", ...rest } = props;
  const type = `${styles[buttonType]}`;
  const size = `${styles[buttonSize]}`;

  return <button {...rest} className={`${styles.button} ${type} ${size}`} />;
}
