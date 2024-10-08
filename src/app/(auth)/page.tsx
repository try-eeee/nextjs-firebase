import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../config";
import { Header } from "@/components/header/Header";
import { MainLayout } from "@/components/mainLayout/MainLayout";
import { getUser } from "@/app/_utils/asyncFunctions";
import { Article } from "./_components/Articles";
import { getArticles } from "./_utils/asyncFunctions";

export default async function ArticlePage() {
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

  const articles = await getArticles(uid);

  if (!articles) {
    return <></>;
  }

  return (
    <MainLayout>
      <Header uid={uid} user={user} title="記事一覧" />
      <Article articles={articles} uid={uid} />
    </MainLayout>
  );
}
