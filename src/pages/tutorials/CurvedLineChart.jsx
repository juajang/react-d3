import React, { useState, useEffect, useRef } from "react";
import { Button } from 'antd';
import * as d3 from "d3";

const CurvedLineChart = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef();

    // will be called initially and on every data change
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const myLine = d3.line()
          .x((value, index) => index * 50)
          .y(value => 150 - value)
          .curve(d3.curveCardinal);
        svg
          .selectAll("path")
          // bind data to a single SVG element
          .data([data])
          .join("path")
          .attr("d", value => myLine(value))
          .attr("fill", "none")
          .attr("stroke", "blue");
    }, [data]);

    return (
      <>
        <h2> Curved Line Chart </h2>
        <svg ref={svgRef}/>
        <br />
        <Button onClick={() => setData(data.map(value => value + 5))}>
            Update data
        </Button>
        <Button onClick={() => setData(data.filter(value => value < 35))}>
            Filter data
        </Button>
      </>
    );
};

export default CurvedLineChart;