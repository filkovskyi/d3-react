import React, { Component } from 'react';
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);

    const pigPopulationArr = this.props.data.map(i => i.pigPopulation);
    const islandsArr = this.props.data.map(i => i.island);

    // Margin convention
    const margin = { top: 80, right: 180, bottom: 80, left: 180 };
    const width = 860 - margin.left - margin.right;
    const height = 560 - margin.top - margin.bottom;

    this.state = {
      margin,
      height,
      width,
      pigPopulationArr,
      islandsArr,
    };

    this.barChartRef = React.createRef();

    this.renderD3 = this.renderD3.bind(this);
    this.updateD3 = this.updateD3.bind(this);

    this.calculateYScale = this.calculateYScale.bind(this);
    this.calculateXScale = this.calculateXScale.bind(this);
    this.drawAxis = this.drawAxis.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      pigPopulationArr: this.props.data.map(i => i.pigPopulation),
      islandsArr: this.props.data.map(i => i.island),
    });

    this.renderD3();
  }

  componentDidUpdate(prevProps, prevState) {
    //do not compare props.chart as it gets updated in updateD3()
    if (this.props.data !== prevProps.data) {
      this.setState({
        ...this.state,
        pigPopulationArr: this.props.data.map(i => i.pigPopulation),
        islandsArr: this.props.data.map(i => i.island),
      });

      this.updateD3();
    }
  }

  calculateYScale() {
    const { height, pigPopulationArr } = this.state;

    return d3
      .scaleLinear()
      .domain([0, Math.max(...pigPopulationArr)])
      .range([height, 0]);
  }

  calculateXScale() {
    const { width, islandsArr } = this.state;

    return d3
      .scaleBand()
      .domain(islandsArr)
      .range([0, width])
      .paddingInner(0.4);
  }

  drawAxis(svg) {
    const { height, width } = this.state;

    // Y-AXIS Scales
    const yScale = this.calculateYScale();

    // X-AXIS Scales
    const xScale = this.calculateXScale();

    // Draw x axis.
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

  renderD3() {
    const { height, width, margin } = this.state;

    // Y-AXIS Scales
    const yScale = this.calculateYScale();

    // X-AXIS Scales
    const xScale = this.calculateXScale();

    const svg = d3
      .select(this.barChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Draw axis
    this.drawAxis(svg);

    // Draw Bars
    const data = this.props.data;

    svg
      .selectAll('rectangle')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'rectangle')
      .attr('x', s => xScale(s.island))
      .attr('y', s => yScale(s.pigPopulation))
      .attr('height', s => height - yScale(s.pigPopulation))
      .attr('width', xScale.bandwidth())
      .style('fill', 'dodgerblue');

    //
    // // Draw labels
    // svg
    //   .append('text')
    //   .attr('x', '-40%')
    //   .attr('y', '-10%')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('text-anchor', 'middle')
    //   .text('Pig population');
    //
    // svg
    //   .append('text')
    //   .attr('x', '33%')
    //   .attr('y', '83%')
    //   .attr('text-anchor', 'middle')
    //   .text('Hawaiian islands');
    //
    // // Draw header
    // const header = svg
    //   .append('g')
    //   .attr('class', 'bar-header')
    //   .attr('transform', `translate(0,${-margin.top * 0.6})`)
    //   .append('text');
    //
    // header.append('tspan').text('Hawaiian Pig Visualization');
    //
    // header
    //   .append('tspan')
    //   .attr('x', 0)
    //   .attr('dy', '1.5em')
    //   .style('font-size', '0.8em')
    //   .style('fill', '#555')
    //   .text('Hawaiian Pig Visualization 2000-2005');
    //
  }

  updateD3() {
    const { height, width, margin, pigPopulationArr, islandsArr } = this.state;

    // Y-AXIS Scales
    const yScale = this.calculateYScale();

    // X-AXIS Scales
    const xScale = this.calculateXScale();

    const svg = d3.select(this.barChartRef.current);

    // Draw Bars
    const data = this.props.data;

    svg
      .selectAll('rect')
      .attr('class', 'rectangle')
      .attr('x', s => xScale(s.island))
      .attr('y', s => yScale(s.pigPopulation))
      .attr('height', s => height - yScale(s.pigPopulation))
      .attr('width', xScale.bandwidth())
      .style('fill', 'dodgerblue');
  }

  render() {
    return <div ref={this.barChartRef} />;
  }
}

export default Chart;
