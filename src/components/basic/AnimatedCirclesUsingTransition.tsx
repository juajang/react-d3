import React, { useRef, useEffect, useState } from "react";
import useInterval from '../../hooks/useInterval';
import * as d3 from "d3";

type Circles = (false | number)[]

export function generateCircles(): Circles {
  const circles  = new Array(5).fill(0);
  return circles.map((value, index) => {
    return Math.random() > 0.5 && index + 1;
  })
}

const AnimatedCircles = () => {
  const [visibleCircles, setVisibleCircles] = useState<Circles>(
    generateCircles()
  );
  const ref = useRef<SVGSVGElement>(null);

  useInterval(() => {
    setVisibleCircles(generateCircles());
  }, 2000);

  useEffect(() => {
    const svgElement: any = d3.select(ref.current);
    svgElement
      .selectAll("circle")
      .data(visibleCircles)
      .join(
        (enter: any) => (
          enter
            .append("circle")
            .attr("cx", (d: Circles, i: number) => i * 15 + 10)
            .attr("cy", 10)
            .attr("r", 0)
            .attr("fill", "cornflowerblue")
          .call((enter: any)=> (
            enter.transition().duration(1200)
              .attr("cy", 10)
              .attr("r", 3)
              .style("opacity", 1)
          ))
        ),
        (update: any) => (
          update.attr("fill", "lightgrey")
        ),
        (exit: any) => (
          exit.attr("fill", "tomato")
            .call((exit: any) => (
              exit.transition().duration(1200)
                .attr("r", 0)
                .style("opacity", 0)
                .remove()
            ))
        )
      )
  }, [visibleCircles])

  return (
    <svg ref={ref} viewBox="0 0 100 20" />
  );
};

export default AnimatedCircles;