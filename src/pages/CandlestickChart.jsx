import React, { useEffect, useRef } from 'react';
import chartData from '../data/candlestickChartData.json';
import * as d3 from 'd3';

const CandlestickChart = () => {
  const svgRef = useRef(null);
  const width = 600;
  const height = 500;
  const margin = {
    top: 20, right: 30, bottom: 30, left: 40
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const formatDate = d3.utcFormat("%B %-d, %Y");
    const formatValue = d3.format(".2f");
    const f = d3.format("+.2%");
    const formatChange = (y0, y1) => f((y1 - y0) / y0);
    const parseDate = d3.utcParse("%Y-%m-%d");

    const data = chartData.map(({ date, high, low, open, close }) => ({
      date: parseDate(date.slice(0, 10)),
      high,
      low,
      open,
      close
    })).slice(-120);

    // 주식 데이터 -> 주중에만 시장이 열리기 때문에 band scale을 사용
    // 각각의 주중이 domain
    const xScale = d3.scaleBand()
      .domain(d3.utcDay
        // interval.range(start, top)
        // : Returns an array of dates representing every interval boundary
        // after or equal to start (inclusive) and before stop (exclusive)
        // 마지막 날짜까지 포함시키기 위해서
        .range(data[0].date, +data[data.length - 1].date + 1)
        // 주중만을 포함하도록 filtering
        .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
      .range([margin.left, width - margin.right])
      .padding(0.2)

    const xAxis = d3.axisBottom(xScale)
      .tickValues(d3.utcMonday
        // graph width에 따라 날짜 간격을 다르게 설정(일주일마다, 이주일마다)
        .every(width > 720 ? 1 : 2)
        .range(data[0].date, data[data.length - 1].date))
      .tickFormat(d3.utcFormat("%-m/%-d"))

    svg.select('.x-axis')
      .call(xAxis)
      // x축 path 없애기
      .call(g => g.select('.domain').remove());

    const yScale = d3.scaleLog()
      .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
      .rangeRound([height - margin.bottom, margin.top])

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format("$~f"))

    svg.select('.y-axis')
      .call(yAxis)
      // y축을 이루는 tick group 안에서 line을 모두 선택 -> 복사해서 x2까지 잇는 line을 만들기
      .call(g => g.selectAll(".tick line")
        .clone()
        .attr("stroke-opacity", 0.2)
        .attr("x2", width - margin.left - margin.right))
      .call(g => g.select(".domain").remove())

    const line = svg.select('.line')
      .selectAll('g')
      .data(data)
      .join('g')
        .attr('transform', d => `translate(${xScale(d.date)}, 0)`);

    line
      .append('line')
      .attr('y1', d => yScale(d.low))
      .attr('y2', d => yScale(d.high))

    line
      .append('line')
      .attr('y1', d => yScale(d.open))
      .attr('y2', d => yScale(d.close))
      .attr('stroke-width', xScale.bandwidth())
      .attr('stroke', d => d.open > d.close ? d3.schemeSet1[0]
        : d.close > d.open ? d3.schemeSet1[2]
        : d3.schemeSet1[8]);

    line
      .append('title')
      .text(d =>
        `${formatDate(d.date)}
        Open: ${formatValue(d.open)}
        Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
        Low: ${formatValue(d.low)}
        High: ${formatValue(d.high)}`)

  }, [margin.bottom, margin.top, margin.left, margin.right, width, height])

  return (
    <>
      <h2> Candlestick Chart </h2>
      <svg
        ref={svgRef}
        viewBox={`0, 0, ${width}, ${height}`}
        width={width}
        height={height}>
        <g className="x-axis" transform={`translate(0, ${height - margin.bottom})`}/>
        <g className="y-axis" transform={`translate(${margin.left}, 0)`}/>
        <g className="line" strokeLinecap="round" stroke="black"/>
      </svg>
    </>
  );
};

export default CandlestickChart;