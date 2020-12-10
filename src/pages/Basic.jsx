import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import styled from "styled-components";
import { Divider } from "antd";
import Mark from "../components/common/Mark";

const Title = styled.h2`
  font-size: 22px;
  font-weight: bolder;
  margin: 2rem 0;
`;

const Basic = () => {
  const refCircle = useRef();
  const refCoordinate = useRef();
  const refScale = useRef();
  const refAxis = useRef();
  const refX = useRef();
  const refY = useRef();
  const refData = useRef();
  const refX2 = useRef();
  const refY2 = useRef();

  const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 400]);

  const margin = {
    top: 10, right: 40, bottom: 30, left: 30
  }
  const width = 450 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xAdjusted = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

  const yAdjusted = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  const data = [
    {x: 10, y: 20},
    {x: 40, y: 90},
    {x: 80, y: 50},
  ]

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
        .style("fill", "pink")
      svg.append("circle")
        .attr("cx", 140)
        .attr("cy", 70)
        .attr("r", 40)
        .attr("fill", "yellow");
      svg.append("circle")
        .attr("cx", 300)
        .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "greenyellow")
    };

    const addScale = () => {
      const svg= d3.select(refScale.current);
      svg.append("circle")
        .attr("cx", x(10))
        .attr("cy", 100)
        .attr("r", 40)
        .style("fill", "pink")
      svg.append("circle")
        .attr("cx", x(50))
        .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "yellow");
      svg.append("circle")
        .attr("cx", x(100))
        .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "greenyellow")
    };

    const addAxis = () => {
      const svg = d3.select(refAxis.current);
      svg.call(d3.axisBottom(x))
    };

    const addAdjustedAxis = () => {
      const svgX = d3.select(refX.current);
      svgX.call(d3.axisBottom(xAdjusted));

      const svgY = d3.select(refY.current);
      svgY.call(d3.axisLeft(yAdjusted));
    };

    const addAdjustedAxis2 = () => {
      const svgX = d3.select(refX2.current);
      svgX.call(d3.axisBottom(xAdjusted));

      const svgY = d3.select(refY2.current);
      svgY.call(d3.axisLeft(yAdjusted));
    };

    addStroke();
    addCircles();
    addScale();
    addAxis();
    addAdjustedAxis();
    addAdjustedAxis2();
  })

  useEffect(() => {
    const bindData = () => {
      const svg = d3.select(refData.current);
      svg
        .selectAll("whatever")
        .data(data)
        .join("circle")
        .attr("cx", d => xAdjusted(d.x))
        .attr("cy", d => yAdjusted(d.y))
        .attr("r", 7)
    };

    bindData();
  })

  return (
    <>
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
      <Title> From data to pixel: Scales </Title>
      <p>
        element의 위치는 <Mark> pixel </Mark>로 표현되지만, input data는 그렇지 않죠. <br/>
        따라서 우리는 숫자를 픽셀로 바꿀 수 있는 함수가 필요합니다. 이것을 <Mark> scale </Mark>이라고 부릅니다.<br/>
        스케일은 항상 <Mark> domain </Mark>과 <Mark> range</Mark>를 가지고 있습니다.
        여기서 <Mark> domain </Mark>은 0 ~ 100%, <Mark> range </Mark> 0 ~ 400px입니다. <br/>
        보통 X축을 위한 scale을 x라고 부릅니다. 만약 <Mark> x(10) </Mark>을 호출한다면, d3는 <Mark> pixel </Mark> 단위의 element의 위치를 반환할 것입니다.
      </p>
      <svg ref={refScale} height="200" width="450"/>
      <Divider/>
      <Title> Add axis </Title>
      <p>
        D3는 축을 자동으로 그리기 위한 함수인 <Mark> axisBottom(X axis) </Mark>, <Mark> axisLeft(Y axis) </Mark>를 제공합니다. <br/>
        축은 항상 <Mark> scale </Mark>의 상단에서 그려집니다.
      </p>
      <svg ref={refAxis} height="200" width="450">
        <circle
          cx={x(10)}
          cy="100"
          r="40"
          style={{ fill: 'pink'}}
        />
        <circle
          cx={x(50)}
          cy="100"
          r="40"
          style={{ fill: 'yellow'}}
        />
        <circle
          cx={x(100)}
          cy="100"
          r="40"
          style={{ fill: 'greenyellow'}}
        />
      </svg>
      <Divider/>
      <Title> Margin & translation </Title>
      <p>
        보통 축의 위치는 조정이 필요합니다. 예를 들어, X축은 차트의 바닥에 있는 것이 일반적입니다. <br/>
        <Mark> translation </Mark>을 사용해서 축의 위치를 바꿀 수 있습니다. <Mark> .attr("transform", "translate(20,50)") </Mark>를 적용해보세요.
      </p>
      <div id="area">
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g ref={refX} transform={`translate(0, ${height})`}/>
          <g ref={refY}/>
        </g>
        </svg>
      </div>
      <Divider/>
      <Title> Data binding </Title>
      <p>
        join을 사용한 <Mark> data binding </Mark>입니다. <br/>
        <Mark> Scale </Mark>을 사용하여 data의 x, y 값을 위치를 나타내는 pixel 값으로 바꿉니다.
      </p>
      <div id="area">
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g ref={refData} transform={`translate(${margin.left},${margin.top})`}>
            <g ref={refX2} transform={`translate(0, ${height})`}/>
            <g ref={refY2}/>
          </g>
        </svg>
      </div>
    </>
  );
}

export default Basic;