import React, { useRef, useEffect } from "react";
import { animated, useSpring } from 'react-spring';

interface AnimatedCircle {
  index: number,
  isShowing: number
}
const AnimatedCircle = ({ index, isShowing }: AnimatedCircle) => {
  const wasShowing = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // @ts-ignore
    wasShowing.current = isShowing;
  }, [isShowing])

  const style = useSpring({
    config: {
      duration: 1200
    },
    r: isShowing ? 3 : 0,
    opacity: isShowing ? 1 : 0,
  })

  return (
    // @ts-ignore
    <animated.circle
      {...style}
      cx={index * 15 + 10}
      cy="10"
      fill={
        isShowing === 0
          ? "tomato"
          : !wasShowing.current
          ? "cornflowerblue"
          : "lightgrey"
      }
    />
  );
};

export default AnimatedCircle;