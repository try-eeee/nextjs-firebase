"use client";

import { usePathname } from "next/navigation";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const boxWidth = isLoginPage ? "400px" : "800px";

  return (
    <div className={styles.container}>
      <div
        className={styles.box}
        style={
          {
            "--box-width": boxWidth,
            "--box-max-width": boxWidth,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
