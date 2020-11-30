import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

interface IData {
  d: string;
  v: number;
}

interface ILineChart {
  height: number;
  values: IData[];
}

const initData: IData[] = []

const LineChart = (props: ILineChart) => {
  const refObject: any = useRef();
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const [jsonData, setJsonData] = useState(initData);
  const [graphHeight, setGraphData] = useState(0);

  useEffect(() => {
    setJsonData(props.values);
    setGraphData(props.height);

    const currentObject: any = refObject.current;
    const width: number = currentObject.offsetWidth;
    const height: number = graphHeight;

    const documentElement: any = d3.select(currentObject)
      .call(g => g.select("svg").remove())
      .append('svg')
      .attr('viewBox', `0,0,${width},${height}`);

    const parseDate = d3.timeParse("%Y-%m-%d");

    const d3Type = d3.line()
      // @ts-ignore
      .defined(d => !isNaN(d.v))
      // @ts-ignore
      .x(d => x(parseDate(d.d)))
      // @ts-ignore
      .y(d => y(d.v));


    const x = d3.scaleUtc()
      // @ts-ignore
      .domain(d3.extent(jsonData, d => parseDate(d.d)))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      // @ts-ignore
      .domain([0, d3.max(jsonData, d => d.v)]).nice()
      .range([height - margin.bottom, margin.top]);

    // @ts-ignore
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    documentElement.append('g').call(xAxis);

    // @ts-ignore
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // @ts-ignore
    documentElement.append('g').call(yAxis).call(g => g.select(".domain").remove());

    documentElement.append('path')
      .datum(jsonData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', d3Type);

  }, [jsonData, graphHeight, props, margin]);

  return (
    <>
      <h2> Line Chart </h2>
      <div ref={refObject} style={{
        width: '100%',
        height: graphHeight
      }}/>
    </>
  );
}

export default LineChart;