"use client";

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/table/Table";
// import { Button } from "@/components/button/Button";
import type { Article } from "../_utils/asyncFunctions";
import styles from "./Articles.module.scss";
// import { formatDate } from "@/utils/formatDate";
// import { useDialog } from "@/components/dialog/Dialog";
// import { useRef, useState } from "react";
// import { ArticleEditorModal, OperationType } from "./ArticleEditorModal";
// import { FaRegTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";

interface ArticleProps {
  articles: Article[];
  uid: string;
}

export function Article(props: ArticleProps) {
  // const { articles, uid } = props;
  const { articles } = props;

  // const AricleRegisterModal = useRef<HTMLDialogElement>(null);
  // const { showModal } = useDialog(AricleRegisterModal);
  // const [operationType, setOperationType] = useState<OperationType>("create");
  // const [article, setArticle] = useState<Article | undefined>(undefined);

  if (!articles) {
    return <></>;
  }

  // const handleCreateArticle = () => {
  //   setOperationType("create");
  //   setArticle(undefined);
  //   showModal();
  // };

  // const handleDeleteArticle = (selectedArticle: Article) => {
  //   setOperationType("delete");
  //   setArticle(selectedArticle);
  //   showModal();
  // };

  // const handleEditArticle = (selectedArticle: Article) => {
  //   setOperationType("edit");
  //   setArticle(selectedArticle);
  //   showModal();
  // };

  // const handleViewArticle = (selectedArticle: Article) => {
  //   setOperationType("view");
  //   setArticle(selectedArticle);
  //   showModal();
  // };

  return (
    <>
      <div className={styles.articlesHeader}>
        {/* <Button buttonType="default" onClick={handleCreateArticle}>
          新規記事作成
        </Button> */}
      </div>
      <Table
        tableHeader={
          <TableRow>
            <TableHeader>記事ID</TableHeader>
            <TableHeader>更新日時</TableHeader>
            <TableHeader>タイトル</TableHeader>
            <TableHeader>閲覧 / 編集 / 削除</TableHeader>
          </TableRow>
        }
        tableRow={
          <>
            {articles.map((article, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell headerLabel="記事ID" width={150}>
                  {article.articleId}
                </TableCell>
                <TableCell headerLabel="更新日時" width={150}>
                  {/* {formatDate(article.createdAt)} */}
                </TableCell>
                <TableCell headerLabel="タイトル">{article.title}</TableCell>
                <TableCell headerLabel="閲覧 / 編集 / 削除" width={180}>
                  {/* <div className={styles.editCell}>
                    <FaRegEye onClick={() => handleViewArticle(article)} />
                    {article.isSelf && (
                      <>
                        <FaEdit onClick={() => handleEditArticle(article)} />
                        <FaRegTrashAlt
                          onClick={() => handleDeleteArticle(article)}
                        />
                      </>
                    )}
                  </div> */}
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      {/* <ArticleEditorModal
        uid={uid}
        article={article}
        operationType={operationType}
        aricleRegisterModal={AricleRegisterModal}
      /> */}
    </>
  );
}
