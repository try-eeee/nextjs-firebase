import { db } from "@/firebaseAdmin";

export type User = {
  lastNameKana: string;
  firstNameKana: string;
  iconURL: string;
};

/**
 * ユーザー情報を取得
 *
 * @param uid ユーザーID
 * @returns ユーザー情報
 */
export async function getUser(uid: string): Promise<User | undefined> {
  try {
    const docRef = db.collection("users").doc(uid);
    const docSnap = await docRef.get();

    const data = docSnap.data();
    if (data) {
      // データが存在する場合のみ User オブジェクトを作成
      return {
        lastNameKana: data.lastNameKana,
        firstNameKana: data.firstNameKana,
        iconURL: data.iconURL,
      } as User;
    } else {
      return undefined; // データが存在しない場合は undefined を返す
    }
  } catch (e) {
    console.error("Error getting document:", e);
    return undefined;
  }
}
