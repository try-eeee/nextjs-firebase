"use client";

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/table/Table";
import { Button } from "@/components/button/Button";
import type { Article } from "../_utils/asyncFunctions";
import styles from "./Articles.module.scss";
import { formatDate } from "@/utils/formatDate";
import { useDialog } from "@/components/dialog/Dialog";
import { useRef, useState } from "react";
import { ArticleEditorModal, OperationType } from "./ArticleEditorModal";

interface ArticleProps {
  articles: Article[];
  uid: string;
}

export function Article(props: ArticleProps) {
  const { articles, uid } = props;
  const AricleRegisterModal = useRef<HTMLDialogElement>(null);
  const { showModal } = useDialog(AricleRegisterModal);
  const [operationType, setOperationType] = useState<OperationType>("create");
  const [article, setArticle] = useState<Article | undefined>(undefined);

  if (!articles) {
    return <></>;
  }

  const handleCreateArticle = () => {
    setOperationType("create");
    setArticle(undefined);
    showModal();
  };

  const handleDeleteArticle = (selectedArticle: Article) => {
    setOperationType("delete");
    setArticle(selectedArticle);
    showModal();
  };

  const handleEditArticle = (selectedArticle: Article) => {
    setOperationType("edit");
    setArticle(selectedArticle);
    showModal();
  };

  const handleViewArticle = (selectedArticle: Article) => {
    setOperationType("view");
    setArticle(selectedArticle);
    showModal();
  };

  return (
    <>
      <div className={styles.articlesHeader}>
        <Button buttonType="default" onClick={handleCreateArticle}>
          新規記事作成
        </Button>
      </div>
      <Table
        tableHeader={
          <TableRow>
            <TableHeader>記事ID</TableHeader>
            <TableHeader>更新日時</TableHeader>
            <TableHeader>タイトル</TableHeader>
            <TableHeader>編集 / 閲覧</TableHeader>
            <TableHeader>削除</TableHeader>
          </TableRow>
        }
        tableRow={
          <>
            {articles.map((article, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{article.articleId}</TableCell>
                <TableCell>{formatDate(article.createdAt)}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  {article.isSelf ? (
                    <Button onClick={() => handleEditArticle(article)}>
                      編集
                    </Button>
                  ) : (
                    <Button onClick={() => handleViewArticle(article)}>
                      詳細
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {article.isSelf && (
                    <Button
                      buttonType="danger"
                      onClick={() => handleDeleteArticle(article)}
                    >
                      削除
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      <ArticleEditorModal
        uid={uid}
        article={article}
        operationType={operationType}
        aricleRegisterModal={AricleRegisterModal}
      />
    </>
  );
}
