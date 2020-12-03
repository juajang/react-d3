import React, { useRef } from "react";
import * as d3 from "d3";

const CurvedLineChart = () => {
    const svgRef = useRef();
    return (
      <svg ref={svgRef}/>
    );
};

export default CurvedLineChart;