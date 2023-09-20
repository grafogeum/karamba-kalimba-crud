import React from "react";
import { Link } from "react-router-dom";
import { ContainerStretched } from "../ui/Container";
import styled from "@emotion/styled";

export const ULStyled = styled.ul`
  list-style-type: "📦";
  padding: 0;
  margin: 0;
`;

const paths = ["Home", "Editor", "Login", "Logout", "Profile", "Settings"];

export const Navigator = (): JSX.Element => (
  <nav>
    <ULStyled>
      <ContainerStretched>
        {paths.map(path => (
          <li key={path}>
            <Link to={`/${path.toLowerCase()}`}>{path}</Link>
          </li>
        ))}
      </ContainerStretched>
    </ULStyled>
  </nav>
);
