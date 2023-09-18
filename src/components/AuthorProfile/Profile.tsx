import { Link, useParams } from "react-router-dom";
import { Avatar, Container, Label, Button } from "../ui";
import { useArticleList } from "../../hooks/useArticleList";
import { useEffect, useState } from "react";
import { ArticleProps } from "../../constants/types";
import styled from "@emotion/styled";

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const { articlesList, fetchUserProfile, followProfile, unFollowProfile } = useArticleList();

  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const toggleFollow = () => {
    if (isFollowing) {
      unFollowProfile(username);
    } else {
      followProfile(username);
    }
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    fetchUserProfile(username);
  }, [username, fetchUserProfile]);

  if (articlesList.length < 1) {
    return <p>Loading...</p>;
  }
  const findArticle = articlesList.find(({ author }) => author.username === username);

  const author = findArticle && findArticle.author;

  if (!author) {
    return <p>Loading...</p>;
  }
  const { bio, image } = author;

  const sortByAuthor = (articles: ArticleProps[]) => {
    console.log("articles", articles);
    return articles.sort((a, b) => (a.author.username > b.author.username ? 1 : -1));
  };

  const binarySearch = (sortedArray: ArticleProps[], targetAuthor: string) => {
    let left = 0;
    let right = sortedArray.length - 1;
    const result = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentAuthor = sortedArray[mid].author.username;

      if (currentAuthor === targetAuthor) {
        result.push(sortedArray[mid]);
      }

      if (currentAuthor >= targetAuthor) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result;
  };

  const sortedArticles = sortByAuthor(articlesList);
  const articlesByAuthor = binarySearch(sortedArticles, username);

  return (
    <ProfileStyled>
      <Avatar imageUrl={image} />
      <Label>{username}</Label>
      <Label>{bio}</Label>
      <h2>Articles by {username}</h2>
      <ul>
        {articlesByAuthor.map(article => (
          <Container key={article.slug}>
            <li>
              <Link to={`/${article.slug}`}>{article.title}</Link>
            </li>
          </Container>
        ))}
      </ul>

      <Button onClick={toggleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>
    </ProfileStyled>
  );
}
