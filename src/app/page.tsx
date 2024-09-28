import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../config";
import Article from "./(auth)/article/page";
import { Header } from "@/components/header/Header";
import { MainLayout } from "@/components/mainLayout/MainLayout";
import { getUser } from "./_utils/asyncFunctions";

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

  const { uid } = tokens.decodedToken;

  if (!uid) {
    notFound();
  }

  const user = await getUser(uid);

  if (!user) {
    notFound();
  }

  return (
    <MainLayout>
      <Header uid={uid} user={user} title="記事一覧" />
      <Article uid={uid} />
    </MainLayout>
  );
}
