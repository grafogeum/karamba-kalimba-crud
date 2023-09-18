import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { ArticleDetails } from "./ArticleDetails";

test("it should render Article Details component", () => {
  const mockSlug = "sample-slug";

  render(
    <MemoryRouter initialEntries={[`/${mockSlug}`]}>
      {" "}
      <Route path="/:slug">
        <ArticleDetails />
      </Route>
    </MemoryRouter>
  );

  screen.logTestingPlaygroundURL();

  expect(
    screen.getByRole("button", {
      name: /🤍👍🏼likes:/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByText(/👍🏼Likes/i)).toBeInTheDocument();
});
