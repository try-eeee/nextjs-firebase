import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
}
