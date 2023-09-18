import React from "react";
import { Link } from "react-router-dom";
import { ContainerStretched } from "../ui/Container";
import styled from "@emotion/styled";

export const ULStyled = styled.ul`
  list-style-type: "📦";
  padding: 0;
  margin: 0;
`;

export const Navigator = (): JSX.Element => (
  <nav>
    <ULStyled>
      <ContainerStretched>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ContainerStretched>
    </ULStyled>
  </nav>
);
