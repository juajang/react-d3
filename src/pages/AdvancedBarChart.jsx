import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import styled from 'styled-components';

const Canvas = styled.div`
  display: grid;
  place-items: center;
  padding: 0;
  .x-axis {
    font-size: 12px;
  }
  .y-axis {
    font-size: 24px;
  }
`

const AdvancedBarChart = () => {
  const data = [
    {name: "🍊", img: process.env.PUBLIC_URL + '/party.png', count: 21},
    {name: "🍇", img: process.env.PUBLIC_URL + '/party.png', count: 13},
    {name: "🍏", img: process.env.PUBLIC_URL + '/party.png', count: 8},
    {name: "🍌", img: process.env.PUBLIC_URL + '/party.png', count: 5},
    {name: "🍐", img: process.env.PUBLIC_URL + '/party.png', count: 3},
    {name: "🍋", img: process.env.PUBLIC_URL + '/party.png', count: 2},
    {name: "🍎", img: process.env.PUBLIC_URL + '/party.png', count: 1},
    {name: "🍉", img: process.env.PUBLIC_URL + '/party.png', count: 1}
  ]
  const ref = useRef();
  const margin = {
    top: 30, right: 20, bottom: 10, left: 40
  }
  const width = 500;
  const height = 400;
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(ref.current);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.count))])
      .range([0, graphWidth])

    const yScale = d3.scaleBand()
      .range([margin.top, graphHeight])
      .domain(data.map((d) => d.name))
      .paddingOuter(0)
      .paddingInner(0.1);

    const colorInterpolate = d3.interpolateRgb("orange", "purple")

    const color = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.count))])
      .range([0, 1])

    const xAxis = d3.axisTop(xScale);
    svg.select(".x-axis")
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
      .ticks(data.length)
      .tickSizeOuter(0)

    svg.select(".y-axis")
      .call(yAxis)
      .selectAll('.tick')
      .data(data)
      .append('image')
      .attr('xlink:href', (d) => d.img)
      .attr('width', 50)
      .attr('height', yScale.bandwidth())
      .attr('x', -50)
      .attr('y', -20)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin.left)
      .attr("y", (d) => yScale(d.name))
      .attr("height", yScale.bandwidth())
      .attr("fill", ({ count }) => colorInterpolate(color(count)))
      .transition()
      .duration(500)
      .attr("width", ({ count }) => xScale(count))
      .attr("fill", ({ count }) => colorInterpolate(color(count)));
  }, [graphWidth, graphHeight, data]);

  return (
    <>
      <h2> Advanced Bar Chart </h2>
      <Canvas>
        <svg ref={ref} width={width} height={height}>
          <g className="x-axis" transform={`translate(${margin.left}, ${margin.top})`}/>
          <g className="y-axis" transform={`translate(${margin.left}, 0)`}/>
        </svg>
      </Canvas>
    </>
  );
};

export default AdvancedBarChart;