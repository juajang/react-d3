import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Canvas = styled.div`
  display: grid;
  place-items: center;
  border-radius: 15px;
  margin: 0 auto;
  padding: 0;
  background-color: #EAF2F8;
  font-family: Roboto, sans-serif;
  h2 {
    font-size: 24px;
    color: #424949;
    font-weight: bolder;
    padding-top: 1rem;
  }
  .x-axis {
    font-size: 12px;
    stroke-width: 0;
  }
  .y-axis {
    font-size: 12px;
    stroke-width: 0;
  }
`

const AdvancedBarChart = () => {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const ref = useRef();

  const data = [
    {name: "고양이", img: process.env.PUBLIC_URL + '/party.png', count: 21},
    {name: "강아지", img: process.env.PUBLIC_URL + '/party.png', count: 13},
    {name: "곰", img: process.env.PUBLIC_URL + '/party.png', count: 8},
    {name: "너구리", img: process.env.PUBLIC_URL + '/party.png', count: 5},
    {name: "백조", img: process.env.PUBLIC_URL + '/party.png', count: 3},
    {name: "호랑이", img: process.env.PUBLIC_URL + '/party.png', count: 2},
    {name: "거위", img: process.env.PUBLIC_URL + '/party.png', count: 1},
    {name: "미어", img: process.env.PUBLIC_URL + '/party.png', count: 1}
  ]

  const margin = {
    top: 30, right: 20, bottom: 10, left: 100
  }
  let width = 500;
  let height = 400;

  let graphWidth = width - margin.left - margin.right;
  let graphHeight = height - margin.top - margin.bottom;

  let imgWidth = 35;
  let marginImg = 0;
  let imgHeight = graphHeight / data.length - marginImg;

  useEffect(() => {
    if (windowWidth < 600) {
      width = windowWidth * 0.9;
      height = 300;

      graphWidth = width - margin.left - margin.right;
      graphHeight = height - margin.top - margin.bottom;

      imgWidth = 35;
      marginImg = 0;
      imgHeight = graphHeight / data.length - marginImg * 2;
    }
  }, [windowHeight, windowWidth])

  useEffect(() => {
    const svg = d3.select(ref.current);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.count))])
      .range([0, graphWidth])

    const yScale = d3.scaleBand()
      .range([margin.top, graphHeight])
      .domain(data.map((d) => d.name))
      .paddingOuter(0)
      .paddingInner(0.3);

    const color = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.count))])
      .range([0, 1])

    const xAxis = d3.axisTop(xScale);
    svg.select(".x-axis")
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
      .ticks(data.length)
      .tickSizeInner(0)
      .tickSizeOuter(0);

    svg.select(".y-axis")
      .call(yAxis)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin.left)
      .attr("y", (d) => yScale(d.name))
      .attr("height", yScale.bandwidth())
      .transition()
      .duration(500)
      .attr("width", ({ count }) => xScale(count))
      .attr("fill", ({ count }) => d3.interpolateGnBu(color(count)));
  }, [graphWidth, graphHeight, data]);

  return (
    <>
      <Canvas>
        <h2> Advanced Bar Chart </h2>
        <svg ref={ref} width={width} height={height}>
          <g className="x-axis" transform={`translate(${margin.left}, ${margin.top})`}/>
          <g className="y-axis" transform={`translate(${margin.left - imgWidth}, 0)`}>
            {data.map(({ name, img }, index) =>
              <g key={index}>
                <image
                  y={margin.top + index * (imgHeight)}
                  height={imgHeight}
                  width={imgWidth}
                  href={img}
                />
              </g>
            )}
          </g>
        </svg>
      </Canvas>
    </>
  );
};

export default AdvancedBarChart;