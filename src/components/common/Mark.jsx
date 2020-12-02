import React from "react";
import styled from 'styled-components';


const Marked = styled.span`
  background-color: #FFEBF1;
  color: #F48FB1
`

const Mark = ({ children }) => (
  <Marked> {children} </Marked>
);

export default Mark;