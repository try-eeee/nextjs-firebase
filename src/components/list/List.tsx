import styles from "./List.module.scss";

interface ListProps {
  items: [];
}

export function List(props: ListProps) {
  const { items } = props;
  return (
    <div {...props} className={styles.wrapper}>
      {items.map((item) => (
        <>{item}</>
      ))}
    </div>
  );
}
