"use server";

import { db } from "@/firebaseAdmin";
import { revalidatePath } from "next/cache";
import { articleEditorSchema } from "./_utils/articleEditorSchema";

export interface CreateArticle {
  uid: string;
  articleId: string;
  content: string;
  title: string;
}

/**
 * 新規記事投稿
 */
export async function createArticle(props: CreateArticle) {
  const { uid, content, title } = props;

  try {
    articleEditorSchema.parse(props);

    const articlesRef = db.collection("articles");

    await articlesRef.add({
      authorId: uid,
      articleId: Math.floor(Math.random() * 900000000000), // ランダムな12桁の数値
      content,
      title,
      createdAt: new Date(),
    });

    revalidatePath("/");

    return "Success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "Invalid";
  }
}

/**
 * 記事編集
 */
export async function updateArticle(props: CreateArticle) {
  const { uid, content, title, articleId } = props;

  try {
    articleEditorSchema.parse(props);

    const articlesRef = db
      .collection("articles")
      .where("authorId", "==", uid)
      .where("articleId", "==", articleId);

    const querySnapshot = await articlesRef.get();

    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      return "Invalid";
    }

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        await doc.ref.set({
          authorId: uid,
          articleId: articleId,
          content,
          title,
          createdAt: new Date(),
        });
      })
    );

    revalidatePath("/");

    return "Success";
  } catch (e) {
    console.error("Error updating document: ", e);
    return "Invalid";
  }
}

/**
 * 記事削除
 */
export async function deleteArticle(props: { uid: string; articleId: string }) {
  const { uid, articleId } = props;
  try {
    if (!uid || !articleId) {
      throw new Error("不正な入力があります");
    }
    const articlesRef = db
      .collection("articles")
      .where("authorId", "==", uid)
      .where("articleId", "==", articleId);

    const querySnapshot = await articlesRef.get();

    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      return "Invalid";
    }

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        await doc.ref.delete();
      })
    );

    revalidatePath("/");

    return "Success";
  } catch (e) {
    console.error("Error deleting document: ", e);
    return "Invalid";
  }
}
