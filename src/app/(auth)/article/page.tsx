import { getArticles } from "./actions";

interface ArticleProps {
  uid: string;
}

export default async function Article(props: ArticleProps) {
  const { uid } = props;
  const dataList = await getArticles(uid);

  if (!dataList) {
    return <></>;
  }

  return (
    <div>
      <h1>Firestore Data</h1>
      <ul>
        {dataList.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
