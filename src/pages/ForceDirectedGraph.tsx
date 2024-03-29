import React, { useEffect, useRef } from 'react';
import data from '../data/forceGraphData';
import * as d3 from 'd3';
import { d3Event, d3DragEventData } from '../types/types';
import { select } from 'd3-selection';

interface GraphData {
  id: string,
  group: string;
  radius: number;
  citing_patents_count: number;
}

const ForceDirectedGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 680;
  const height = 680;

  useEffect(() => {
    const svg = select(svgRef.current);

    // 1. create a simulation for an array of nodes
    // 2. compose the desired forces
    // 3. listen for tick events to render the nodes

    // link, node를 prototype으로 가지는 새로운 객체 만들기
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d))

    // group 이름을 기준으로 색을 지정
    const colorScale = d3.scaleOrdinal()
      .domain(data.nodes.map((d) => d.group))
      .range(d3.schemeSet3);

    // 드래그 시뮬레이션
    const drag: Function = (simulation: any) => {
      // d: node
      function dragStarted(event?: d3Event, d?: d3DragEventData) {
        // alpha: simulation이 시간이 지남에 따라 식혀지면서 (cool down) 줄어드는 값
        // alphaMin에 다다르면 simulation이 멈춘다.
        // 드래그 시작, fx/fy를 현재의 x/y position으로 정하기
        if (!event?.active) simulation.alphaTarget(0.4).restart();
        if (d) {
          d.fx = d.x;
          d.fy = d.y;
        }
      }

      function dragged(event?: d3Event, d?: d3DragEventData) {
        // 드래그 하는 중
        if (d) {
          d.fx = event?.x as number;
          d.fy = event?.y as number;
        }
      }

      function dragEnded(event?: d3Event, d?: d3DragEventData) {
        // 드래그가 멈추면 그 즉시 시뮬레이션도 멈춤
        if (!event?.active) simulation.alphaTarget(0);
        if (d) {
          d.fx = null;
          d.fy = null;
        }
      }

      return d3.drag()
        .on("start", (dragStarted as any))
        .on("drag", (dragged as any))
        .on("end", (dragEnded as any));
    };

    const simulation = d3
      /*
      sets the simulation’s nodes to the specified array of objects,
      initializing their positions and velocities if necessary,
      and then re-initializes any bound forces
      Each node (object) has ...
      index - the node’s zero-based index into nodes
      x - the node’s current x-position
      y - the node’s current y-position
      vx - the node’s current x-velocity
      vy - the node’s current y-velocity
      fx - the node’s fixed x-position
      fy - the node’s fixed y-position
      */
      .forceSimulation(nodes)
      // link force - 연결된 node들을 같이 혹은 떨어져있게 하는 힘
      // id 접근자를 d.id로 설정 (default는 index 기반)
      .force("link", d3.forceLink(links).id((d: any) => d.id))
      // Many-body force: 모든 노드들 사이에서 작용하는 힘
      // link와 달리 global하게 모든 노드들 사이에서(연결되어 있지 않더라도) 작용
      // electrostatic charge (repulsion) 정전기적 반발력 추가
      .force("charge", d3.forceManyBody())
      // positioning force: 원하는 위치로 해당 차원에서 node를 움직이게 함
      // force의 강도는 node와 target 사이의 일차원 거리에 비례함
      // x, y축에 따라 positioning force 생성 (default 값인 0으로)
      .force("x", d3.forceX())
      .force("y", d3.forceY())

    const link = svg
      .select('.link')
      .selectAll('line')
      .data(links)
      .join('line')
        .attr('stroke-width', (d: GraphData) => Math.sqrt(d.citing_patents_count));

    const node = svg
      .select('.node')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', (d: GraphData) => colorScale(d.group) as string)
      // 드래그 이벤트들 추가
      .call(drag(simulation))

    node
      .append("title")
      .text((d: GraphData) => d.id)

    simulation
      // tick - after each tick of the simulation’s internal timer
      .on("tick", () => {
        link
          // x1, y1: first endpoint
          // x2, y2: second endpoint
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y)
        node
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y)
      })
  },[])

  return (
    <>
      <h2> Force-Directed Graph </h2>
      <svg
        width={width}
        height={height}
        ref={svgRef}
        viewBox={`${-width/2} ${-height/2} ${width} ${height}`}>
        <g className="link" stroke="#999" strokeOpacity="0.6"/>
        <g className="node" stroke="#999" strokeWidth="1.5"/>
      </svg>
    </>
  );
}

export default ForceDirectedGraph;