"use client";

import styles from "./Label.module.scss";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  align: "left" | "center" | "right";
  required?: boolean;
}

export function Label(props: LabelProps) {
  const { htmlFor, children, align, required } = props;
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${styles[align]}`}>
      {children}
      {required && <span className={styles.required}>必須</span>}
    </label>
  );
}
