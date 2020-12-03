import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

const LineChart = (props) => {
  const ref = useRef();
  const [jsonData, setJsonData] = useState([]);
  const [graphHeight, setGraphData] = useState(0);

  useEffect(() => {
    const margin = {top: 20, right: 30, bottom: 30, left: 40};

    setJsonData(props.values);
    setGraphData(props.height);

    const currentElement = ref.current;
    const width = currentElement.offsetWidth;
    const height = graphHeight;

    const documentElement = d3.select(currentElement)
        .call(g => g.select("svg").remove())
        .append('svg')
        .attr('viewBox', `0,0,${width},${height}`);

    const parseDate = d3.timeParse("%Y-%m-%d");

    const d3Type = d3.line()
      .defined(d => !isNaN(d.v)) // true, false
      .x(d => x(parseDate(d.d)))
      .y(d => y(d.v));


    const x = d3.scaleUtc()
      .domain(d3.extent(jsonData, d => parseDate(d.d)))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(jsonData, d => d.v)]).nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    documentElement.append('g')
        .call(xAxis);

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    documentElement.append('g')
        .call(yAxis)
        .call(g => g.select(".domain").remove());

    documentElement.append('path')
      .datum(jsonData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', d3Type);

  }, [jsonData, graphHeight, props]);

  return (
    <>
      <h2> Line Chart </h2>
      <div ref={ref} style={{
        width: '100%',
        height: graphHeight
      }}/>
    </>
  );
}

export default LineChart;