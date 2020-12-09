import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import data from '../data/forceGraphData.json';
import * as d3 from 'd3';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

const ForceDirectedGraph = () => {
  const svgRef = useRef(null);
  const width = 680;
  const height = 680;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

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
    const drag = (simulation) => {
      // d: node
      function dragStarted(event, d) {
        // alpha: simulation이 시간이 지남에 따라 식혀지면서 (cool down) 줄어드는 값
        // alphaMin에 다다르면 simulation이 멈춘다.
        // 드래그 시작, fx/fy를 현재의 x/y position으로 정하기
        if (!event.active) simulation.alphaTarget(0.4).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event,d) {
        // 드래그 하는 중
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragEnded(event,d) {
        // 드래그가 멈추면 그 즉시 시뮬레이션도 멈춤
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
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
      .force("link", d3.forceLink(links).id(d => d.id))
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
        .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg
      .select('.node')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', d => colorScale(d.group))
      // 드래그 이벤트들 추가
      .call(drag(simulation))

    node
      .append("title")
      .text(d => d.id)

    simulation
      // tick - after each tick of the simulation’s internal timer
      .on("tick", () => {
        link
          // x1, y1: first endpoint
          // x2, y2: second endpoint
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
      })
  },[])

  return (
    <Wrapper>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold'
      }}> Force-Directed Graph </h2>
      <svg
        width={width}
        height={height}
        ref={svgRef}
        viewBox={`${-width/2} ${-height/2} ${width} ${height}`}>
        <g className="link" stroke="#999" strokeOpacity="0.6"/>
        <g className="node" stroke="#999" strokeWidth="1.5"/>
      </svg>
    </Wrapper>
  );
}

export default ForceDirectedGraph;