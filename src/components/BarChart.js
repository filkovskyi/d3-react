import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  componentDidMount() {
    // Utils and helpers
    const pigPopulationArr = this.props.data.map(i => i.pigPopulation);

    // Margin convention
    const margin = { top: 80, right: 80, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // X-AXIS Scales
    const xMax = Math.max(...pigPopulationArr);

    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, width]);

    // Y-AXIS Scales
    const yScale = d3
      .scaleBand()
      .domain(this.props.data.map(d => d.island))
      .rangeRound([0, height])
      .paddingInner(0.25);

    // Draw base
    const svg = d3
      .select(this.refs.anchor)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw Bars
    svg
      .append('g')
      .attr('class', 'bars')
      .selectAll('.bar')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => yScale(d.island))
      .attr('width', d => xScale(d.pigPopulation))
      .attr('height', yScale.bandwidth())
      .style('fill', 'dodgerblue');

    // Draw header
    const header = svg
      .append('g')
      .attr('class', 'bar-header')
      .attr('transform', `translate(0,${-margin.top * 0.6})`)
      .append('text');

    header.append('tspan').text('Total revenue by genre in $US');

    header
      .append('tspan')
      .attr('x', 0)
      .attr('dy', '1.5em')
      .style('font-size', '0.8em')
      .style('fill', '#555')
      .text('Films w/ budget and revenue figures, 2000-2009');

    // Draw x axis.
    const xAxis = d3
      .axisTop(xScale)
      .tickSizeInner(-height)
      .tickSizeOuter(0);

    const xAxisDraw = svg
      .append('g')
      .attr('class', 'x axis')
      .call(xAxis);

    // Draw y axis.
    const yAxis = d3.axisLeft(yScale).tickSize(0);

    const yAxisDraw = svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    yAxisDraw.selectAll('text').attr('dx', '-0.6em');
  }

  render() {
    return (
      <div className="graph">
        <g ref="anchor" />
      </div>
    );
  }
}

export default BarChart;
