import { Fragment } from "react";
import { Article } from "./Article";
import { ArticlePostProps } from "../../constants/types";
import { useArticleList } from "../../hooks/useArticleList";

export default function ArticleList(): JSX.Element {
  const { articlesList, handleAddToFavorite, favoriteArticleRemove } = useArticleList();

  return (
    <>
      {articlesList.length < 1 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articlesList.map(({ slug }: ArticlePostProps, i: number) => (
            <Fragment key={slug}>
              <Article
                {...{ ...articlesList }[i]}
                onAddToFavorite={handleAddToFavorite}
                onRemoveFromFavorite={favoriteArticleRemove}
              ></Article>
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
}
