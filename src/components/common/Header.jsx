import React from "react";
import LinkButton from "./LinkButton";
import styled from "styled-components";
import { Divider } from 'antd';

const Wrapper = styled.header`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  h2 {
    font-size: 20px;
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
      <Divider/>
      <h2> The Basics </h2>
      <ButtonContainer>
        <LinkButton name="Basic" url="/basic"/>
        <LinkButton name="Line Chart" url="/line-chart"/>
        <LinkButton name="Bar Chart" url="/bar-chart"/>
      </ButtonContainer>
      <h2> How to use React with D3 </h2>
    <ButtonContainer>
        <LinkButton name="React with D3 Basics" url="/react-with-d3"/>
    </ButtonContainer>
    </Wrapper>
  );
};

export default Header;