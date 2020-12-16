import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const InteractivityBasic = () => {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
  const svgRef = useRef<SVGSVGElement>(null);

  const margin = {
    top: 10, right: 20, bottom: 20, left: 10
  }
  const width = 500;
  const height = 300;
  const graphHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg: any = d3.select(svgRef.current);

    const index = data.map((_, index) => String(index))
    const xScale: any = d3.scaleBand()
      .domain(index)
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yMaxValue = d3.max(data, d => d) as number;
    const yScale: any = d3.scaleLinear()
      .domain([0, yMaxValue])
      .range([height - margin.bottom, margin.top])

    const colorInterpolate = d3.interpolateRgb("palevioletred", "blueviolet")

    const colorExtent: any = d3.extent(data, d => d);
    const colorScale = d3.scaleLinear()
      .domain(colorExtent)
      .range([0, 1])

    // xAxis generator
    const xAxis: any = d3.axisBottom(xScale).ticks(data.length);
    // create x-axis
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height - margin.bottom}px)`)
      .call(xAxis);

    // yAxis generator
    const yAxis: any = d3.axisRight(yScale);
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
      .attr("x", (_: any, index: number) => xScale(String(index)))
      .attr("y", -(height - margin.bottom))
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (this: Function, event: any, value: number) {
        const index = svg.selectAll(".bar").nodes().indexOf(this);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(
            (enter: any) => enter.append("text").attr("y", yScale(value) - 4)
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
      .attr("fill", (value: d3.NumberValue) => colorInterpolate(colorScale(value)))
      .attr("height", (value: number) => graphHeight - yScale(value))
  }, [data])

  return (
    <>
      <h2> Interactive Chart </h2>
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