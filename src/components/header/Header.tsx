/* eslint-disable @next/next/no-img-element */
"use client";

import { getAuth, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/firebaseClient";
import styles from "./Header.module.scss";
import { User } from "@/app/_utils/asyncFunctions";
import { IoIosLogOut } from "react-icons/io";

interface HeaderProps {
  uid: string;
  user: User;
  title: string;
}

export function Header(props: HeaderProps) {
  const { user, title } = props;
  const onLogout = async () => {
    const { clientApp } = getFirebaseAuth();

    if (!clientApp) {
      return;
    }
    const auth = getAuth(clientApp);
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("ログアウトに失敗しました:", error);
      });
    await fetch("/api/logout");
  };
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.userInfo}>
        <img src={user.iconURL} alt="Preview" className={styles.icon} />
        <div className={styles.userName}>{user.lastNameKana}</div>
        <IoIosLogOut onClick={onLogout} />
      </div>
    </div>
  );
}
