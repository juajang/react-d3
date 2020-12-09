import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const InteractivityBasic = () => {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
  const svgRef = useRef();

  const margin = {
    top: 10, right: 20, bottom: 20, left: 10
  }
  const width = 500;
  const height = 300;
  const graphHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleBand()
      .domain(data.map((value, index) => index))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range([height - margin.bottom, margin.top])

    const colorInterpolate = d3.interpolateRgb("palevioletred", "blueviolet")

    const colorScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d))
      .range([0, 1])

    // xAxis generator
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    // create x-axis
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height - margin.bottom}px)`)
      .call(xAxis);

    // yAxis generator
    const yAxis = d3.axisRight(yScale);
    // create y-axis
    svg
      .select(".y-axis")
      .style("transform", `translateX(${width - margin.right}px)`)
      .call(yAxis);

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -(height - margin.bottom))
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (event, value) {
        const index = svg.selectAll(".bar").nodes().indexOf(this);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(
            (enter) => enter.append("text").attr("y", yScale(value) - 4)
          )
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) + 6)
          .attr("opacity", 1)
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", (value) => colorInterpolate(colorScale(value)))
      .attr("height", (value) => graphHeight - yScale(value))
  }, [data])

  return (
    <>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis"/>
        <g className="y-axis"/>
      </svg>
      <Button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </Button>
      <Button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </Button>
      <Button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>
        Add data
      </Button>
    </>
  );
}


export default InteractivityBasic;