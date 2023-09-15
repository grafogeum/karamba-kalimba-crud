import { ArticlesList } from "../containers/GetArticles";
import { Article } from "./Article";
import { ArticlePostProps } from "../constants/types";
import { Container } from "./ui/Container";

export default function ArticleList(): JSX.Element {
  return (
    <>
      <ArticlesList
        render={({ data, loading, error }) => {
          console.log("articles", data);

          return (
            <>
              <Container>
                {loading ? (
                  <p>LOADING Component •••</p>
                ) : error ? (
                  <p>Error:☞ {error.message}</p>
                ) : (
                  <ul>
                    {data.map(
                      ({
                        title,
                        description,
                        author,
                        createdAt,
                        favorited,
                        favoritesCount,
                        slug,
                      }: ArticlePostProps) => (
                        <div key={title}>
                          <Article {...{ title, description, author, createdAt, favorited, favoritesCount, slug }} />
                        </div>
                      )
                    )}
                  </ul>
                )}
              </Container>
            </>
          );
        }}
      />
    </>
  );
}
