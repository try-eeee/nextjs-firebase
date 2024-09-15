"use server";

import { db } from "@/firebaseAdmin";

/**
 *
 * 投稿文書を全件取得
 *
 * @returns articles
 */
export async function getArticles(uid: string) {
  try {
    const q = db
      .collection("articles")
      .where("authorId", "==", "ISrOUcm7DseNXHpVOgUwNtPQLfX2");
    const querySnapshot = await q.get();
    const articles = querySnapshot.docs.map((doc) => doc.data());

    console.log("Document written articles: ", articles);

    return articles;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
