import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import indexChartData from '../data/indexChartData';

const IndexChart = () => {
  const svgRef = useRef(null);

  const width = 800;
  const height = 600;
  const margin = {
    top: 20, right: 40, bottom: 30, left: 40
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const parseDate = d3.utcParse("%Y-%m-%d");

    const data = indexChartData.map(({ name, date, value }) => ({
      name,
      date: parseDate(date.slice(0, 10)),
      value
    }));

    const groups = d3.groups(data, d => d.name);

    const series = groups.map(([key, values]) => ({
      key,
      values: values.map(({ date, value }) => ({
        date,
        value: value / values[0].value
      }))
    }));

    const xDomain = d3.extent(data, (d: any) => d.date) as [number, number];
    const xScale = d3.scaleUtc()
      .domain(xDomain)
      .range([margin.left, width - margin.right])
      .clamp(true);

    const k = d3.max(groups, ([_, group]) => {
      const maxValue = d3.max(group, d => d.value) as number;
      const minValue = d3.min(group, d => d.value) as number;
      return maxValue / minValue;
    }) as number;

    const yScale = d3.scaleLog()
      .domain([1 / k, k])
      .rangeRound([height - margin.bottom, margin.top]);

    const zScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(data.map(d => d.name));

    const xAxis: any = d3.axisBottom(xScale)
      .ticks(width / 80)
      .tickSizeOuter(0);

    svg.select('.x-axis')
      .call(xAxis)
      .call(g => g.select('.domain').remove());

    const yAxis: any = d3.axisLeft(yScale)
      .ticks(null, (x: any) => +x.toFixed(6) + 'x')

    svg.select('.y-axis')
      .call(yAxis)
      .call(g => g.selectAll('.tick line')
        .clone()
        .attr('stroke-width', d => d === 1 ? null : 0.2)
        .attr('x2', width - margin.left - margin.right))
      .call(g => g.select('.domain').remove())

    const line = d3.line()
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value))

    const rule = svg.append('g')
      .append('line')
      .attr('y1', height)
      .attr('y2', 0)
      .attr('stroke', 'black')

    const serie = svg.append('g')
      .style('font', 'bold 10px sans-serif')
      .selectAll('g')
      .data(series)
      .join('g')

    serie.append('path')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke', d => zScale(d.key))
      .attr('d', (d: any) => line(d.values))

    serie.append('text')
      .datum(d => ({
        key: d.key,
        value: d.values[d.values.length - 1].value
      }))
      .attr('x', xScale.range()[1] + 3)
      .attr('y', d => yScale(d.value))
      .attr('dy', '0.35em')
      .text(d => d.key)
      .attr('fill', d => zScale(d.key))

    const bisect = d3.bisector((d: any) => d.date).left;

    function update(date: Date) {
      const roundedDate = d3.utcDay.round(date);
      rule.attr('transform', `translate(${xScale(roundedDate) + 0.5}, 0)`)
      serie.attr('transform', ({ values }) => {
        const i = bisect(values, date, 0, values.length - 1);
        return `translate(0, ${yScale(1) - yScale(values[i].value / values[0].value)})`
      })
      svg.property('value', date).dispatch('input');
    }

    d3.transition()
      .ease(d3.easeCubicOut)
      .duration(1500)
      .tween('date', () => {
        const i = d3.interpolateDate(xScale.domain()[1], xScale.domain()[0]);
        return (date: number) => update(i(date));
      })

    function moved(this: any, event: any) {
      update(xScale.invert(d3.pointer(event, this)[0]));
      event.preventDefault();
    }

    svg.on('mousemove touchmove', moved);

    update(xScale.domain()[0]);
  }, [margin.right, margin.left, margin.top, margin.bottom])

  return (
    <>
      <h2> Index Chart </h2>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" transform={`translate(0, ${height - margin.bottom})`} />
        <g className="y-axis" transform={`translate(${margin.left}, 0)`} />
      </svg>
    </>
  );
};

export default IndexChart;
