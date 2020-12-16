import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

interface LineChartData {
  d: string;
  v: number;
}

interface LineChartProps {
  height: number;
  values: LineChartData[];
}

const LineChart = (props: LineChartProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [graphHeight, setGraphData] = useState(0);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    setGraphData(props.height);

    const currentElement = divRef.current;
    const width = currentElement?.offsetWidth as number;
    const height = graphHeight;

    const documentElement = d3.select(currentElement)
      .call(g => g.select("svg").remove())
      .append('svg')
      .attr('viewBox', `0,0,${width},${height}`);

    const parseDate: any = d3.timeParse("%Y-%m-%d");

    const data = props.values.map(({ d, v}) => ({
      d: parseDate(d), v
    }))

    const d3Type: Function = d3.line()
      .x((value: any)=> x(value.d))
      .y((value: any) => y(value.v));

    const xDomain = d3.extent(data, d => d.d) as [number, number];

    const x = d3.scaleUtc()
      .domain(xDomain)
      .range([margin.left, width - margin.right]);

    const yMax = d3.max(data, d => d.v) as number;
    const y = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g: any) => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    documentElement.append<SVGGElement>('g')
      .call(xAxis);

    const yAxis: any = (g: any) => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    documentElement.append<SVGGElement>('g')
      .call(yAxis)
      .call(g => g.select(".domain").remove());

    documentElement.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', data => d3Type(data));

  } , [props.values, graphHeight, props]);

  return (
    <>
      <h2> Line Chart </h2>
      <div ref={divRef} style={{
        width: '100%',
        height: graphHeight
      }}/>
    </>
  );
}

export default LineChart;