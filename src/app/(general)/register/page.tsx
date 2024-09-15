"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "../../../firebaseClient";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    console.log("handleSubmit");
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }
    try {
      const { clientApp } = getFirebaseAuth();
      if (!clientApp) {
        throw new Error("Missing app!");
      }
      const result = await createUserWithEmailAndPassword(
        getAuth(clientApp),
        email,
        password
      );

      console.log(result);
      router.push("/login");
    } catch (e) {
      const errorCode = (e as FirebaseError).code;
      const errorMessage = (e as FirebaseError).message;
      console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
      setError(errorMessage);

      setError((e as Error).message);
    }
  }

  return (
    <main className="">
      <div className="">
        <div className="">
          <h1 className="">
            Pray tell, who be this gallant soul seeking entry to mine humble
            abode?
          </h1>
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
            <div>
              <label htmlFor="confirm-password" className="">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                id="confirm-password"
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
              Create an account
            </button>
            <p className="">
              Already have an account?
              <Link href="/login" className="">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
