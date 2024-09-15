"use client";

import { getAuth, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/firebaseClient";

interface HeaderProps {
  uid: string;
}

export function Header(props: HeaderProps) {
  const onLogout = async () => {
    const { clientApp } = getFirebaseAuth();

    if (!clientApp) {
      return;
    }
    const auth = getAuth(clientApp);
    signOut(auth)
      .then(() => {
        // ログアウト成功
        console.log("ログアウトしました");
        // ログアウト後の処理 (例: ログインページにリダイレクト)
        window.location.href = "/login";
      })
      .catch((error) => {
        // ログアウト失敗
        console.error("ログアウトに失敗しました:", error);
      });
    await fetch("/api/logout");
  };
  return (
    <div className="">
      <h1>ヘッダータイトル</h1>
      <div className="">ログイン中のユーザー</div>
      <button onClick={onLogout}>ログアウト</button>
    </div>
  );
}
