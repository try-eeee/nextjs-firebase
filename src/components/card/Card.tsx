import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card(props: CardProps) {
  const { title, children } = props;
  return (
    <div {...props} className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
}
