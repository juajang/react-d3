import React, { useEffect, useRef } from 'react';
import * as d3 from "d3"
import styled from "styled-components";
import chartData from "../data/barData";

type ChartData = {
  date: string;
  value: number;
}

const Canvas = styled.div`
  display: grid;
  place-items: center;
  rect {
    fill: yellowgreen;
    &:hover {
      fill: green;
      transition: all 0.2s;
    }
  }
`;

const BarChart = () => {
  const ref = useRef<SVGGElement>(null);
  const xAxisRef = useRef<SVGGElement | null>(null)
  const yAxisRef = useRef<SVGGElement>(null)

  const margin = {
    top: 20, right: 20, bottom: 70, left: 30
  }
  const width = 540;
  const height = 600;
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const createBarChart = async () => {
      const data = chartData.nodes;

      const maxValue = d3.max(data, d => d.value) as number; // cast to number
      const y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([graphHeight, 0])

      const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, 500])
        .paddingInner(0.2)
        .paddingOuter(0.2);

      const svg: any = d3.select(ref.current);
      svg
        .selectAll(".bar-rect")
        .data(data)
        .join("rect")
        .attr('class','bar-rect')
        .attr('width', x.bandwidth)
        .attr('height', ({ value }: ChartData) => graphHeight - y(value))
        .attr('x', ({ date }: ChartData) => x(date))
        .attr('y',  ({ value }: ChartData)=> y(value))

      const xAxis: any = d3.axisBottom(x);
      const yAxis: any = d3.axisLeft(y)
        .ticks(10)

      d3.select(xAxisRef.current).call(xAxis);
      d3.select(yAxisRef.current).call(yAxis).attr("transform", `translateX(${margin.left})`)
    };

    createBarChart();
  }, [graphHeight, margin.left])

  return (
    <>
      <h2> Bar Chart </h2>
      <Canvas>
        <svg width={width} height={height}>
          <g ref={ref} width={graphWidth} height={graphHeight} transform={`translate(${margin.left}, ${margin.top})`}>
            <g ref={xAxisRef} transform={`translate(0, ${graphHeight})`}/>
            <g ref={yAxisRef}/>
          </g>
        </svg>
      </Canvas>
    </>
  );
};
export default BarChart;