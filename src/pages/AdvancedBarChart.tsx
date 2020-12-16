import React, { useEffect, useRef, useCallback, useMemo } from 'react';
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
interface AnimalData {
  name: string;
  img: string;
  count: number;
}

const AdvancedBarChart = () => {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const ref = useRef<SVGSVGElement>(null);

  const data = useMemo(() => [
    {name: "고양이", img: `${process.env.PUBLIC_URL}/002-kiwi.png`, count: 21},
    {name: "강아지", img: `${process.env.PUBLIC_URL}/003-rum.png`, count: 13},
    {name: "곰", img: `${process.env.PUBLIC_URL}/004-rugby.png`, count: 8},
    {name: "너구리", img: `${process.env.PUBLIC_URL}/005-eucalyptus.png`, count: 5},
    {name: "백조", img: `${process.env.PUBLIC_URL}/006-koala.png`, count: 3},
    {name: "호랑이", img: `${process.env.PUBLIC_URL}/007-vegemite.png`, count: 2},
    {name: "거위", img: `${process.env.PUBLIC_URL}/008-acacia.png`, count: 1},
    {name: "미역", img: `${process.env.PUBLIC_URL}/009-kangaroo.png`, count: 1}
  ], [])

  const margin = {
    top: 30, right: 20, bottom: 10, left: 100
  }

  let width = 500;
  let height = 400;
  let imgWidth = 30;

  const createBarChart = useCallback((graphWidth, graphHeight, imgWidth, imgHeight) => {
    const svg: any = d3.select(ref.current);

    const xMaxValue = d3.max(data, (d: AnimalData) => d.count) as number;
    const xScale: any = d3.scaleLinear()
      .domain([0, xMaxValue])
      .range([0, graphWidth])

    const yScale: any = d3.scaleBand()
      .range([margin.top, graphHeight])
      .domain(data.map((d) => d.name))
      .paddingOuter(0)
      .paddingInner(0.3);

    const color = d3.scaleLinear()
      .domain([0, xMaxValue])
      .range([0, 1])

    const xAxis: any = d3.axisTop(xScale);
    svg.select(".x-axis")
      .call(xAxis)

    const yAxis: any = d3.axisLeft(yScale)
      .ticks(data.length)
      .tickSizeInner(0)
      .tickSizeOuter(0);

    svg.select(".y-axis")
      .call(yAxis)

    svg.select(".y-img-axis").selectAll(".image").remove();

    // add custom axis with images
    svg.select('.y-img-axis')
      .selectAll(".image")
      .data(data)
      .join('svg:image')
      .attr('class', 'image')
      .attr('x', -45)
      .attr('y', (d: AnimalData) => yScale(d.name) - 7)
      .attr('xlink:href', (d: AnimalData) => d.img)
      .attr('width', imgWidth)
      .attr('height', imgHeight)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin.left)
      .attr("y", (d: AnimalData) => yScale(d.name))
      .attr("height", yScale.bandwidth())
      .transition()
      .duration(500)
      .attr("width", ({ count }: AnimalData) => xScale(count))
      .attr("fill", ({ count }: AnimalData) => d3.interpolateGnBu(color(count)));
  }, [data, margin.left, margin.top]);

  // resize graph based on the window size
  useEffect(() => {
    let width = 500;
    let height = 400;

    let graphWidth = width - margin.left - margin.right;
    let graphHeight = height - margin.top - margin.bottom;

    let marginImg = 10;
    let imgWidth = graphWidth / data.length - marginImg;
    let imgHeight = graphHeight / data.length - marginImg;

    if (windowWidth < 600) {
      const width = windowWidth * 0.9;
      height = 300;

      graphWidth = width - margin.left - margin.right;
      graphHeight = height - margin.top - margin.bottom;

      imgHeight = (graphHeight / data.length - marginImg > 0)
        ? (graphHeight / data.length - marginImg) : 10;
      imgWidth = imgHeight
    }

    createBarChart(graphWidth, graphHeight, imgWidth, imgHeight);
  }, [windowHeight, windowWidth, createBarChart, margin.left, margin.right, margin.top, margin.bottom, data.length])

  return (
    <>
      <Canvas>
        <h2> Advanced Bar Chart </h2>
        <svg ref={ref} width={width} height={height}>
          <g className="x-axis" transform={`translate(${margin.left}, ${margin.top})`}/>
          <g className="y-axis" transform={`translate(${margin.left - imgWidth - 15}, 0)`}/>
          <g className="y-img-axis" transform={`translate(${margin.left}, 0)`}/>
        </svg>
      </Canvas>
    </>
  );
};

export default AdvancedBarChart;