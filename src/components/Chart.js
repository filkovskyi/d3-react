import React, { Component } from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.renderD3 = this.renderD3.bind(this);
    this.updateD3 = this.updateD3.bind(this);
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate(prevProps, prevState) {
    //do not compare props.chart as it gets updated in updateD3()
    if (this.props.data !== prevProps.data) {
      this.updateD3();
    }
  }

  renderD3() {
    // This will create a faux div and store its virtual DOM
    const faux = this.props.connectFauxDOM('div', 'chart');

    // Utils and helpers
    const pigPopulationArr = this.props.data.map(i => i.pigPopulation);

    // Margin convention
    const margin = { top: 80, right: 80, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Y-AXIS Scales
    const yMax = Math.max(...pigPopulationArr);

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    // X-AXIS Scales
    const xScale = d3
      .scaleBand()
      .domain(this.props.data.map(d => d.island))
      .range([0, width])
      .paddingInner(0.4);

    // Draw base
    const svg = d3
      .select(faux)
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
      .attr('x', s => xScale(s.island))
      .attr('y', s => yScale(s.pigPopulation))
      .attr('height', s => height - yScale(s.pigPopulation))
      .attr('width', xScale.bandwidth())
      .style('fill', 'dodgerblue');

    // Draw labels
    svg
      .append('text')
      .attr('x', '-40%')
      .attr('y', '-10%')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Pig population');

    svg
      .append('text')
      .attr('x', '33%')
      .attr('y', '83%')
      .attr('text-anchor', 'middle')
      .text('Hawaiian islands');

    // Draw header
    const header = svg
      .append('g')
      .attr('class', 'bar-header')
      .attr('transform', `translate(0,${-margin.top * 0.6})`)
      .append('text');

    header.append('tspan').text('Hawaiian Pig Visualization');

    header
      .append('tspan')
      .attr('x', 0)
      .attr('dy', '1.5em')
      .style('font-size', '0.8em')
      .style('fill', '#555')
      .text('Hawaiian Pig Visualization 2000-2005');

    // // Draw x axis.
    const xAxis = d3.axisBottom(xScale).tickSize(height, 0, 0);

    const xAxisDraw = svg
      .append('g')
      .attr('class', 'x axis')
      .call(xAxis);

    // Draw y axis.
    const yAxis = d3.axisLeft(yScale).tickSize(-width, 0, 0);

    const yAxisDraw = svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    yAxisDraw.selectAll('text').attr('dx', '-0.6em');
  }

  updateD3() {
    // Utils and helpers
    const pigPopulationArr = this.props.data.map(i => i.pigPopulation);

    // Margin convention
    const margin = { top: 80, right: 80, bottom: 40, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Y-AXIS Scales
    const yMax = Math.max(...pigPopulationArr);

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    // X-AXIS Scales
    const xScale = d3
      .scaleBand()
      .domain(this.props.data.map(d => d.island))
      .range([0, width])
      .paddingInner(0.4);

    // This will create a faux div and store its virtual DOM
    const faux = this.props.connectFauxDOM('div', 'chart');

    const svg = d3
      .select(faux)
      .select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // rejoin data
    svg
      .attr('class', 'bars')
      .selectAll('.bar')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', s => xScale(s.island))
      .attr('y', s => yScale(s.pigPopulation))
      .attr('height', s => height - yScale(s.pigPopulation))
      .attr('width', xScale.bandwidth())
      .style('fill', 'dodgerblue');

    this.props.animateFauxDOM(2000);
  }

  render() {
    return <div>{this.props.chart}</div>;
  }
}

const FauxChart = withFauxDOM(Chart);

export default FauxChart;
