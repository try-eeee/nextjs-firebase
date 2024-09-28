import styles from "./BirthdayInput.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface BirthdayInputProps extends React.ComponentPropsWithoutRef<"input"> {
  register?: UseFormRegisterReturn;
}

export function BirthdayInput(props: BirthdayInputProps) {
  const { register, ...rest } = props;
  return <input {...register} {...rest} className={styles.birthdayInput} />;
}
