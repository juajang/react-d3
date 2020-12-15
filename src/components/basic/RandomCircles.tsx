import React, { useEffect, useRef, useState } from "react";
import useInterval from "../../hooks/useInterval";
import * as d3 from "d3";

const generateDataset = (length: number) => (
 Array(length).fill(0).map(() => ([
   Math.random() * 80 + 10,
   Math.random() * 35 + 10,
 ]))
)

const RandomCircles = () => {
  const [dataset, setDataset] = useState(generateDataset(10));
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.selectAll("circle")
      .data(dataset)
      .join("circle")
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", 3)
  }, [dataset])

  useInterval(() => {
    const newDataset = generateDataset(10);
    setDataset(newDataset);
  }, 2000)

  return (
    <svg viewBox="0 0 100 50"
         ref={ref}
    />
  );
};

export default RandomCircles;