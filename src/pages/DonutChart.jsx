import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import * as d3 from 'd3';

const Donut = styled.svg`
  font-family: 'Roboto', sans-serif;
  .textTop {
    font-size: 18px;
  }
  .textBottom {
    font-size: 30px;
    font-weight: bolder;
  }
`;
const Legend = styled.svg`
  font-size: 12px;
`;

const DonutChart = () => {
  const svgRef = useRef(null);
  const margin = {
    top: 20, right: 20, bottom: 50, left: 10
  }
  const width = 700;
  const height = 700;
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const radius = Math.min(graphWidth, graphHeight) / 2 - 50;
  const innerRadius = 170;

  const data = [
    {"label":"ONE", "value":194},
    {"label":"TWO", "value":567},
    {"label":"THREE", "value":1314},
    {"label":"FOUR", "value":793},
    {"label":"FIVE", "value":1929},
    {"label":"SIX", "value":1383}
  ];

  const total = data.reduce((sum, current) => sum + current.value, 0);

  const colorScale = d3.scaleLinear()
    .domain(d3.extent(data, (data) => data.value))
    .range([0, 1])

  const colored = (t) => d3.interpolateYlGnBu(colorScale(t));

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const textTop = svg
      .append('text')
      .style('text-anchor', 'middle')
      .attr('class', 'textTop')
      .text('TOTAL')
      .attr('y', -10);

    const textBottom = svg
      .append('text')
      .attr('dy', '0.3em')
      .style('text-anchor', 'middle')
      .attr('class', 'textBottom')
      .text(total + 'm')
      .attr('y', 10);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    const arcOver = d3.arc()
      .innerRadius(innerRadius + 5)
      .outerRadius(radius + 5);

    // Compute the position of each group on the pie
    const pie = d3.pie()
      .value(d => d.value)
      .padAngle(0.01);

    svg
      .selectAll(".slice")
      .data(pie(data))
      .join("path")
      .attr('fill', d => colored(d.value))
      .attr('d', arc)
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcOver)
        textTop
          .text(d3.select(this).datum().data.label)
          .attr("y", -10)
        textBottom
          .text(d3.select(this).datum().data.value + 'm')
          .attr("y", 10)
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('d', arc)
        textTop
          .text("TOTAL")
          .attr('y', -10)
        textBottom
          .text(total + 'm');
      })
  }, [])

  return (
    <>
      <h1>Donut Chart</h1>
      <Donut
        width={graphWidth}
        height={graphHeight}
        // pan left, pan up & zoom out and show double the content
        // viewBox={`${-graphWidth/2} ${-graphHeight/2} ${graphWidth} ${graphHeight}`}
        preserveAspectRatio="xMinYMin"
      >
        <g
          ref={svgRef}
          transform={`translate(${graphWidth/2}, ${graphHeight/2})`}
        />
      </Donut>
      <Legend>
      {data.map(({ label, value }, index) =>
        <g key={index}>
          <rect
            y={index * 20}
            width={20}
            height={15}
            fill={colored(value)}
          />
          <text
            x={45}
            y={12 + index * 20}
            fill='black'
            textAnchor='middle'
          >
            {label}
          </text>
        </g>
      )}
      </Legend>
    </>
  );
}

export default DonutChart;