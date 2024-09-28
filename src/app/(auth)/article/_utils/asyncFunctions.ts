import { db } from "@/firebaseAdmin";

export type Article = {
  authorId: string;
  articleId: string;
  content: string;
  createdAt: string;
  title: string;
  isSelf: boolean;
};

/**
 * 投稿文書を全件取得（createdAt で降順ソート）
 *
 * @returns articles
 */
export async function getArticles(uid: string): Promise<Article[]> {
  try {
    const q = db.collection("articles").orderBy("createdAt", "desc"); // createdAt で降順ソート
    const querySnapshot = await q.get();
    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        authorId: data.authorId,
        articleId: data.articleId,
        content: data.content,
        createdAt: data.createdAt
          ? data.createdAt.toDate().toISOString()
          : null,
        title: data.title,
        isSelf: data.authorId === uid,
      } as Article;
    });

    return articles;
  } catch (e) {
    console.error("Error adding document: ", e);
    return [];
  }
}
