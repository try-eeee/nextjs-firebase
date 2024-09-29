"use client";

import clsx from "clsx";
import { Button } from "@/components/button/Button";
import styles from "./ArticleEditorModal.module.scss";
import { Dialog, useDialog } from "@/components/dialog/Dialog";
import { Textarea } from "@/components/textarea/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import { articleEditorSchema } from "../_utils/articleEditorSchema";
import {
  createArticle,
  CreateArticle,
  deleteArticle,
  updateArticle,
} from "../actions";
import { Article } from "../_utils/asyncFunctions";
import { Input } from "@/components/input/Input";
import { Label } from "@/components/label/Label";
import { FirebaseError } from "firebase-admin";
import { IoMdClose } from "react-icons/io";

export type OperationType = "edit" | "create" | "delete" | "view";

interface ArticleEditorModalProps {
  operationType: OperationType;
  aricleRegisterModal: RefObject<HTMLDialogElement>;
  article?: Article;
  uid: string;
}

export function ArticleEditorModal(props: ArticleEditorModalProps) {
  const { operationType, aricleRegisterModal, article, uid } = props;
  const { ref: myRef, closeModal } = useDialog(aricleRegisterModal);

  useEffect(() => {
    reset({
      title: article?.title ?? "",
      content: article?.content ?? "",
    });
  }, [article]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateArticle>({
    mode: "onSubmit",
    resolver: zodResolver(articleEditorSchema),
  });

  const onSubmit = async (data: CreateArticle) => {
    try {
      await {
        create: () => createArticle({ ...data, uid }),
        edit: () =>
          updateArticle({
            ...data,
            articleId: article?.articleId ?? "",
            uid,
          }),
        delete: () => {
          return;
        },
        view: () => {
          return;
        },
      }[operationType]();
    } catch (e) {
      const errorCode = (e as FirebaseError).code;
      const errorMessage = (e as FirebaseError).message;
      console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
    } finally {
      reset();
      closeModal();
    }
  };

  const handleDelete = async () => {
    if (!article?.articleId) {
      console.error("");
      return;
    }
    try {
      await deleteArticle({
        uid,
        articleId: article.articleId,
      });
    } catch (e) {
      const errorCode = (e as FirebaseError).code;
      const errorMessage = (e as FirebaseError).message;
      console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
    } finally {
      reset();
      closeModal();
    }
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  return (
    <Dialog ref={myRef} handleOutside={handleCloseModal}>
      <>
        <div
          className={clsx(
            styles.header,
            {
              create: styles.create,
              edit: styles.edit,
              delete: styles.delete,
              view: styles.view,
            }[operationType]
          )}
        >
          <span>
            {
              {
                create: "新規作成",
                edit: "編集",
                delete: "削除",
                view: "詳細",
              }[operationType]
            }
          </span>
          <IoMdClose className={styles.closeIcon} onClick={handleCloseModal} />
        </div>
        <div className={styles.form}>
          {operationType === "view" ? (
            <div className={styles.viewLabel}>タイトル</div>
          ) : (
            <Label htmlFor="title" align="left" required>
              タイトル
            </Label>
          )}
          {operationType === "view" ? (
            <div className={styles.viewTitle}>{getValues("title")}</div>
          ) : (
            <Input
              type="text"
              register={register("title", {
                required: true,
              })}
              onBlur={(e) => setValue("title", e.target.value.trim())}
              disabled={operationType === "delete"}
            />
          )}
          {errors.title && (
            <span className={styles.error}>タイトルは必須です</span>
          )}

          {operationType === "view" ? (
            <div className={styles.viewLabel}>内容</div>
          ) : (
            <Label htmlFor="content" align="left" required>
              内容
            </Label>
          )}
          {operationType === "view" ? (
            <div className={styles.viewContent}>{getValues("content")}</div>
          ) : (
            <Textarea
              register={register("content", {
                required: true,
              })}
              maxLength={140}
              disabled={operationType === "delete"}
            />
          )}

          {errors.content && (
            <span className={styles.error}>内容は必須です</span>
          )}
        </div>

        <div className={operationType === "view" ? "" : styles.footer}>
          {
            {
              create: (
                <Button onClick={handleSubmit(onSubmit)}>新規投稿</Button>
              ),
              edit: <Button onClick={handleSubmit(onSubmit)}>編集</Button>,
              delete: (
                <Button buttonType="danger" onClick={handleDelete}>
                  削除
                </Button>
              ),
              view: <></>,
            }[operationType]
          }
        </div>
      </>
    </Dialog>
  );
}
