import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import styled from "styled-components";
import { Divider } from "antd";

//components
import Mark from "../components/common/Mark";
import RandomCirclesUsingReact from "../components/basic/RandomCircleUsingReact";
import RandomCircles from "../components/basic/RandomCircles";
import AnimatedCircle from '../components/basic/AnimatedCircle';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bolder;
  margin: 2rem 0;
`;

const ReactWithD3Basic = () => {
  const refCircle = useRef();
  const refCoordinate = useRef();

  useEffect(() => {
    const currentCircle = refCircle.current;
    const addStroke = () => {
      d3.select(currentCircle)  // select the elements that have the class 'target'
        .style("stroke-width", 8); // change their style: stroke width is not equal to 8 pixels
    };

    const currentCoordinate = refCoordinate.current;
    const addCircles = () => {
      const svg = d3.select(currentCoordinate);
      svg.append("circle")
        .attr("cx", 2)
        .attr("cy", 2)
        .attr("r", 40)
        .style("fill", "blue")
      svg.append("circle")
        .attr("cx", 140)
        .attr("cy", 70)
        .attr("r", 40)
        .attr("fill", "red");
      svg.append("circle")
        .attr("cx", 300)
        .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "green")
    };

    addStroke();
    addCircles();
  }, [])

  return (
    <Wrapper>
      <Title> All SVG Elements have been supported in JSX!  </Title>
      <svg ref={refCircle}>
        <circle
          stroke="#69b3a2"
          cx="50"
          cy="50"
          r="40"
          style={{ fill: 'pink' }}/>
      </svg>
      <Divider/>
      <Title> Use the coordinate system </Title>
      <svg ref={refCoordinate} id="circles-area" height="200" width="450"/>
      <Divider/>
      <Title> Random circles using .join() method </Title>
      <p>
        <Mark> dataset </Mark>이 변할때마다 코드를 다시 실행합니다. <br/>
        이때 <Mark> dataset </Mark>을 다시 계산하기 위해서 <Mark> useInterval </Mark>을 사용합니다.
      </p>
      <RandomCircles/>
      <Divider/>
      <Title> Random circles using React </Title>
      <p>
        각각의 data point를 돌면서<br/>
        <Mark> [x, y] </Mark>에 있는 <Mark> circle </Mark>을 렌더링합니다.
      </p>
      <RandomCirclesUsingReact/>
      <Divider/>
      <Title> Animated Circles with transition </Title>
      <p>
        우리는 6개의 <Mark> circle </Mark>을 가지고 2초마다 랜덤하게 렌더링합니다. <br/>
        새로운 circle은 파란색으로 표시합니다.  <br/>
        여러 라운드동안 유지되고 있는 circle은 회색으로 표시합니다.  <br/>
        새로운 라운드에서 빠지게 되는 circle은 빨간색으로 표시합니다.  <br/>
      </p>
      <AnimatedCircle/>
    </Wrapper>
  );
}

export default ReactWithD3Basic;