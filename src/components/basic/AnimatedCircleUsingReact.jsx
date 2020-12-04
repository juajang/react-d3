import React, { useState } from "react";
import { generateCircles } from './AnimatedCirclesUsingTransition';
import AnimatedCircle from './AnimatedCircle';
import useInterval from '../../hooks/useInterval';

const AnimatedCircleUsingReact = () => {
  const [visibleCircles, setVisibleCircles] = useState(
    generateCircles()
  );

  useInterval(() => {
    setVisibleCircles(generateCircles())
  }, 2000)

  return (
    <svg viewBox="0 0 100 20">
      {visibleCircles.map((d, index) => (
        <AnimatedCircle
          key={index}
          index={index + 1}
          isShowing={d ? d : 0}
        />
      ))}
    </svg>
  );
};

export default AnimatedCircleUsingReact;