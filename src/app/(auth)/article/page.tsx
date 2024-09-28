import { Article } from "./_components/Articles";
import { getArticles } from "./_utils/asyncFunctions";

interface ArticleProps {
  uid: string;
}

export default async function ArticlePage(props: ArticleProps) {
  const { uid } = props;
  const articles = await getArticles(uid);

  if (!articles) {
    return <></>;
  }

  return <Article articles={articles} uid={uid} />;
}
