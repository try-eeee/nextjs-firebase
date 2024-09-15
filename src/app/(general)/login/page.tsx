"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/firebaseClient";

export default function Login() {
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
      setError((e as Error).message);
    }
  }

  return (
    <main>
      <h1 className="">Speak thy secret word!</h1>
      <form onSubmit={handleSubmit} className="" action="#">
        <div>
          <label htmlFor="email" className="">
            Your email
          </label>

          <input
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
        <div>
          <label htmlFor="password" className="">
            Password
          </label>
          <input
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
          <div className="" role="alert">
            <span className="">{error}</span>
          </div>
        )}
        <button type="submit" className="">
          Enter
        </button>
        <p className="">
          Don&apos;t have an account?
          <Link href="/register" className="">
            Register here
          </Link>
        </p>
      </form>
    </main>
  );
}
