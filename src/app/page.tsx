import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../config";
import Article from "./(auth)/article/page";
import { Header } from "@/components/Header";

export default async function Home() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    notFound();
  }

  console.log("uid", tokens?.decodedToken.uid);

  return (
    <main className="">
      <Header uid={tokens?.decodedToken.uid ?? ""} />
      <h1 className="">Super secure home page</h1>
      <p>
        Only <strong>{tokens?.decodedToken.email}</strong> holds the magic key
        to this kingdom!"
      </p>

      <Article uid={tokens?.decodedToken.uid} />
    </main>
  );
}
