import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import * as d3 from "d3";

const Basics = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20]);
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "new")
            .attr("r", value => value)
            .attr("cx", value => value * 2)
            .attr("cy", value => value * 2)
            .attr("stroke", "red")
    }, [data])

    return (
      <>
        <h2> The Basics </h2>
        <svg ref={svgRef}/>
        <Button onClick={() => setData(data.map(value => value + 5))}>
            Update data
        </Button>
        <Button onClick={() => setData(data.filter(value => value < 35))}>
            Filter data
        </Button>
      </>
    );
};

export default Basics;