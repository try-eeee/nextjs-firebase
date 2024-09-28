import React from "react";
import styles from "./RadioGroup.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends React.ComponentPropsWithoutRef<"input"> {
  options: RadioOption[];
  register?: UseFormRegisterReturn;
}

export function RadioGroup(props: RadioGroupProps) {
  const { options, register } = props;
  return (
    <div className={`${styles.radioGroup}`}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioLabel}>
          <input type="radio" {...register} value={option.value} />
          <span className={styles.radioButton}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
}
