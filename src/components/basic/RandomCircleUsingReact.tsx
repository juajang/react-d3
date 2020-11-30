import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";

const generateDataset = (length: number) => (
  Array(length).fill(0).map(() => ([
    Math.random() * 80 + 10,
    Math.random() * 35 + 10,
  ]))
)

const RandomCirclesUsingReact = () => {
  const [dataset, setDataset] = useState(generateDataset(10));

  useInterval(() => {
    const newDataset = generateDataset(10);
    setDataset(newDataset);
  }, 2000)

  return (
    <svg viewBox = "0 0 100 50" >
      {dataset.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
       />
      ))}
    </svg>
  );
}

export default RandomCirclesUsingReact;