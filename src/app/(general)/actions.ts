"use server";

import { auth, db } from "@/firebaseAdmin";
import { registerSchema } from "./register/_utils/registerSchema";

export type RegisterFormValues = {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  gender: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
  isUploadImage: boolean;
};

/**
 * ユーザー作成
 */
export async function createUser(props: RegisterFormValues) {
  const {
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    gender,
    email,
    birthDate,
    password,
  } = props;
  let userRecord = null;
  try {
    registerSchema.parse(props);

    userRecord = await auth.createUser({
      email,
      password,
    });

    // Firestoreにユーザー情報を保存
    const userRef = db.collection("users").doc(userRecord.uid);

    await userRef.set({
      uid: userRecord.uid,
      lastName,
      firstName,
      lastNameKana,
      firstNameKana,
      gender,
      birthDate,
      iconURL: "",
    });

    console.log("User registered and data saved successfully");
    return userRecord.uid;
  } catch (error) {
    console.error("Error registering user and saving data: ", error);
    if (userRecord && userRecord.uid) {
      await auth.deleteUser(userRecord.uid);
      console.log("User deleted due to Firestore save failure");
    }

    return "";
  }
}

/**
 * ユーザー削除
 */
export async function deleteUser(userId: string) {
  try {
    if (!userId) {
      throw new Error("入力が不正です");
    }
    // 認証情報からユーザーを削除
    await auth.deleteUser(userId);

    // Firestoreからユーザー情報を削除
    const userRef = db.collection("users").doc(userId);
    await userRef.delete();

    console.log("User deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting user: ", error);
    return false;
  }
}

/**
 * ユーザー情報更新
 *
 * @param uid ユーザーID
 * @param iconURL アイコンURL
 */
export async function updateUser(uid: string, iconURL: string) {
  try {
    // Firestore にユーザー情報を更新
    const userRef = db.collection("users").doc(uid);
    await userRef.update({
      iconURL,
    });

    console.log("User updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating user: ", error);
    return false;
  }
}
