import React from "react";
import styled from 'styled-components';

const Marked = styled.span`
  background-color: #FFEBF1;
  color: #F48FB1
`

interface MarkProps {
  children?: React.ReactNode
}

const Mark = ({ children }: MarkProps) => (
  <Marked> {children} </Marked>
);

export default Mark;