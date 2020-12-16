import React, { useEffect, useRef, useState } from 'react';
import * as d3 from "d3";
import { Button } from 'antd';
import styled from 'styled-components';
import { fruitsData } from '../../data/fruits';

const Canvas = styled.div`
  display: grid;
  place-items: center;
  padding: 0;
  .x-axis {
    font-size: 24px;
  }
  .y-axis {
    font-size: 16px;
  }
`

interface Fruit {
  name: string;
  count: number;
}

const AnimatedBarChart = () => {
  const [data, setData] = useState(fruitsData)
  const ref = useRef<SVGSVGElement>(null);
  const margin = {
    top: 20, right: 20, bottom: 10, left: 20
  }
  const width = 700;
  const height = 700;
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg: any = d3.select(ref.current);

    const x = d3.scaleBand()
      .domain(data.map((value) => value.name))
      .range([margin.left, graphWidth + margin.left])
      .padding(0.5)
      .round(true)

    const maxYValue: any = d3.max(data, d => d.count);
    const y = d3.scaleLinear()
      .domain([0, maxYValue])
      .range([height - margin.bottom, margin.bottom])
    const colorInterpolate = d3.interpolateRgb("orange", "purple")

    const color = d3.scaleLinear()
      .domain([0, maxYValue])
      .range([0, 1])

    const xAxis: any = d3.axisBottom(x)
      .ticks(data.length)
      .tickSizeOuter(0);

    svg.select(".x-axis")
      .call(xAxis);

    const yAxis: any = d3.axisRight(y);
    svg.select(".y-axis")
      .call(yAxis)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value: Fruit) => x(value.name))
      .attr("y", -graphHeight)
      .attr("width", x.bandwidth())
      .transition()
      .attr("height", ({ count }: Fruit) => graphHeight - y(count))
      .attr("fill", ({ count }: Fruit) => colorInterpolate(color(count)));
  }, [graphWidth, graphHeight, data, margin.left, margin.right, margin.top, margin.bottom]);

  return (
    <>
      <h2> Animated Bar Chart </h2>
      <Canvas>
        <svg ref={ref} width={width} height={height}>
          <g className="x-axis" transform={`translate(0, ${graphHeight})`}/>
          <g className="y-axis" transform={`translate(${graphWidth}, 0)`}/>
        </svg>
      </Canvas>
      <Button onClick={() => setData(data.map(({ name, count }) => ({ name, count: count + 5 })))}>
        Update data
      </Button>
      <Button onClick={() => setData(data.filter(({ count }) => count < 35))}>
        Filter data
      </Button>
    </>
  );
};

export default AnimatedBarChart;