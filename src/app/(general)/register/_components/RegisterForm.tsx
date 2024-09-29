"use client";

import { useState } from "react";
import Link from "next/link";
import {
  createUser,
  deleteUser,
  RegisterFormValues,
  updateUser,
} from "../../action";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase-admin";
import { Label } from "@/components/label/Label";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientRegisterSchema } from "../_utils/registerSchema";
import { RadioGroup } from "@/components/radioGroup/RadioGroup";
import { BirthdayInput } from "@/components/birthdayInput/BirthdayInput";
import { CheckBoxWithLabel } from "@/components/checkBoxWithLabel/CheckBoxWithLabel";
import styles from "./RegisterForm.module.scss";
import { FileUpload } from "@/components/fileUpload/FileUpload";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseAuth } from "@/firebaseClient";

interface ExtendedError extends Error {
  code?: string;
}

const defaultValues = {
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  gender: "",
  email: "",
  birthDate: "",
  password: "",
  confirmPassword: "",
  agreement: false,
  isUploadImage: false,
};

/**
 * 新規会員登録フォーム
 */
export function RegisterForm() {
  const router = useRouter();
  const [customErrors, setCustomErrors] = useState({
    matchedPassword: "",
    submit: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(clientRegisterSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setCustomErrors({
      matchedPassword: "",
      submit: "",
    });

    if (data.password !== data.confirmPassword) {
      setCustomErrors((prevErrors) => ({
        ...prevErrors,
        matchedPassword: "パスワードとパスワード(確認)が一致しません。",
      }));
      return;
    }

    let uid = "";
    try {
      uid = await createUser(data);
      const iconURL = await imageUpload(uid);

      if (!iconURL) {
        throw new Error("ダウンロードした画像取得に失敗しました");
      }

      await updateUser(uid, iconURL);

      router.push("/login");
    } catch (e) {
      const errorMessage = (e as FirebaseError).message;

      // 画像アップロードに失敗した場合、作成したユーザーを削除
      if (uid) {
        await deleteUser(uid);
      }

      setCustomErrors((prevErrors) => ({
        ...prevErrors,
        matchedPassword: errorMessage,
      }));
    }
  };

  const imageUpload = async (uid: string) => {
    try {
      if (!uid || !file) {
        throw new Error();
      }
      const { storage } = getFirebaseAuth();

      const fileName = `userIcon.${file.name.split(".").pop()}`;
      const storageRef = ref(storage, `userProfileIcon/${uid}/${fileName}`);

      // Firebase Storageに画像をアップロード
      const result = await uploadBytes(storageRef, file).then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
        }
      );

      return result;
    } catch (error) {
      if (!uid) {
        const error: ExtendedError = new Error(
          "アップロードの入力が不正です。"
        );
        error.code = "INVALID_UPLOAD_INPUT";
        throw error;
      }
    }
  };

  // アップロードされた際の処理
  const handleUploadUserIcon = () => {
    setValue("isUploadImage", true);
    clearErrors("isUploadImage");
  };

  // アップロードされた画像が削除された時の処理
  const handleRemoveUserIcon = () => {
    setValue("isUploadImage", false);
    setError("isUploadImage", {
      type: "manual",
      message: "ユーザーアイコンは必須です",
    });
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>新規会員登録</h1>

      <div className={styles.form}>
        <div className={styles.formItem}>
          <Label htmlFor="lastName" align="left" required>
            姓
          </Label>

          <Input
            type="text"
            id="lastName"
            register={register("lastName", {
              required: true,
            })}
            onBlur={(e) => setValue("lastName", e.target.value.trim())}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName.message}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <Label htmlFor="firstName" align="left" required>
            名
          </Label>

          <Input
            type="text"
            id="firstName"
            register={register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName.message}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <Label htmlFor="lastNameKana" align="left" required>
            セイ
          </Label>

          <Input
            type="text"
            id="lastNameKana"
            register={register("lastNameKana", { required: true })}
          />
          {errors.lastNameKana && (
            <span className={styles.error}>{errors.lastNameKana.message}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <Label htmlFor="firstNameKana" align="left" required>
            メイ
          </Label>
          <Input
            type="text"
            id="firstNameKana"
            register={register("firstNameKana", { required: true })}
          />
          {errors.firstNameKana && (
            <span className={styles.error}>{errors.firstNameKana.message}</span>
          )}
        </div>
        <div className={`${styles.fullWidth}`}>
          <Label htmlFor="gender" align="left" required>
            姓別
          </Label>

          <RadioGroup
            options={[
              { value: "male", label: "男性" },
              { value: "female", label: "女性" },
              { value: "other", label: "その他" },
            ]}
            register={register("gender", { required: true })}
          />

          {errors.gender && (
            <div className={styles.error}>{errors.gender.message}</div>
          )}
        </div>
        <div className={styles.fullWidth}>
          <Label htmlFor="email" align="left" required>
            メールアドレス
          </Label>
          <Input
            type="email"
            id="email"
            register={register("email", { required: true })}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </div>
        <div className={`${styles.fullWidth} ${styles.alignLeft}`}>
          <Label htmlFor="birthDate" align="left" required>
            生年月日
          </Label>
          <BirthdayInput
            type="date"
            id="birthDate"
            register={register("birthDate", {
              required: true,
            })}
          />
          {errors.birthDate && (
            <div className={styles.error}>{errors.birthDate.message}</div>
          )}
        </div>
        <div className={styles.formItem}>
          <Label htmlFor="password" align="left" required>
            パスワード
          </Label>
          <Input
            type="password"
            id="password"
            register={register("password", { required: true })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <Label htmlFor="confirmPassword" align="left" required>
            パスワード（確認）
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            register={register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className={`${styles.fullWidth} ${styles.alignLeft}`}>
          <Label htmlFor="iconUpload" align="left" required>
            ユーザーアイコン
          </Label>
          <FileUpload
            setFile={setFile}
            handleUploadImage={handleUploadUserIcon}
            handleRemoved={handleRemoveUserIcon}
          />
          {errors.isUploadImage && (
            <div className={styles.error}>{errors.isUploadImage.message}</div>
          )}
        </div>

        <div className={`${styles.fullWidth} ${styles.alignCenter}`}>
          <CheckBoxWithLabel register={register("agreement")}>
            <>
              利用規約に同意する 利用規約は
              <a
                href="https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.agreementLink}
              >
                こちら
              </a>
            </>
          </CheckBoxWithLabel>
          {errors.agreement && (
            <span className={styles.error}>{errors.agreement.message}</span>
          )}

          {customErrors.matchedPassword && (
            <span className={styles.error}>{customErrors.matchedPassword}</span>
          )}

          {customErrors.submit && (
            <span className={styles.error}>{customErrors.submit}</span>
          )}
          <Button onClick={handleSubmit(onSubmit)}>アカウント作成</Button>

          <p className={styles.fullWidth}>
            既にアカウントをお持ちですか?
            <Link href="/login" className={styles.loginLink}>
              ログインは <span>こちら</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
