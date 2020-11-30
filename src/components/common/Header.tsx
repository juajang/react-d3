import React from "react";
import LinkButton from "./LinkButton";
import styled from "styled-components";

const Wrapper = styled.header`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <h1> Learning D3 with React </h1>
      <LinkButton name="Basic" url="/basic"/>
    </Wrapper>
  );
};

export default Header;