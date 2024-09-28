"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/firebaseClient";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { Label } from "@/components/label/Label";
import styles from "./LoginForm.module.scss";

/**
 * ログインフォーム
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const { clientApp } = getFirebaseAuth();
      if (!clientApp) {
        throw new Error("Missing app!");
      }
      const credential = await signInWithEmailAndPassword(
        getAuth(clientApp),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      await fetch("/api/login", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      router.push("/");
    } catch (e) {
      setError("ログイン情報が正しくありません。");
    }
  }

  return (
    <main>
      <h1 className={styles.title}>ログイン</h1>
      <form onSubmit={handleSubmit} className={styles.form} action="#">
        <div>
          <Label htmlFor="email" align="left">
            メールアドレス
          </Label>

          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className=""
            placeholder="name@company.com"
            required
          />
        </div>
        <div className={styles.mb5rem}>
          <Label htmlFor="password" align="left">
            パスワード
          </Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="••••••••"
            className=""
            required
          />
        </div>
        {error && (
          <div className={styles.error} role="alert">
            <span className="">{error}</span>
          </div>
        )}
        <Button type="submit" className={styles.loginButton}>
          ログイン
        </Button>
        <p>
          まだ会員登録がお済みでないですか?
          <br />
          <Link href="/register" className="">
            新規会員登録は こちら
          </Link>
        </p>
      </form>
    </main>
  );
}
