import React from "react";
import styled from 'styled-components';

interface MarkProps {
  children: React.ReactNode;
}

const Marked = styled.span`
  background-color: #FFEBF1;
  color: #F48FB1
`

const Mark = ({ children }: MarkProps) => (
  <Marked> {children} </Marked>
);

export default Mark;