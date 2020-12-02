import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import styled from "styled-components";
import { Divider } from "antd";

//components
import Mark from "../components/common/Mark";
import RandomCirclesUsingReact from "../components/basic/RandomCircleUsingReact";
import RandomCircles from "../components/basic/RandomCircles";

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bolder;
  margin: 2rem 0;
`;

const Basic = () => {
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
        We're re-running our code whenever <Mark> dataset changes </Mark> <br/>
        Use <Mark> useInterval </Mark> to re-calculate our <Mark> dataset </Mark>
      </p>
      <RandomCircles/>
      <Divider/>
      <Title> Random circles using React </Title>
      <p>
        Looping over each data point, and <br/>
        rendering a <Mark> circle </Mark> at <Mark> [x, y] </Mark>
      </p>
      <RandomCirclesUsingReact/>
      <Divider/>
    </Wrapper>
  );
}

export default Basic;