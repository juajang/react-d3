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

const ButtonContainer = styled.div`
  display: flex;
  margin: 1rem auto;
  justify-content: space-around;
`;

const Header = () => {
  return (
    <Wrapper>
      <h1> Learning D3 with React </h1>
      <ButtonContainer>
        <LinkButton name="Basic" url="/basic"/>
        <LinkButton name="Line Chart" url="/line-chart"/>
      </ButtonContainer>
      <h2> Using React(Hooks) with D3 </h2>
    <ButtonContainer>
        <LinkButton name="Basics" url="/basics"/>
    </ButtonContainer>
    </Wrapper>
  );
};

export default Header;