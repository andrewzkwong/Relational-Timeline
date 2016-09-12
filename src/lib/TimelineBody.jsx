import React from 'react';
import ReactDOM from 'react-dom';

import d3chart from './d3chart.js';

export default class TimelineBody extends React.Component{
  constructor(props){
    super(props);
    this.handleOpenTooltip = this.handleOpenTooltip.bind(this);
  }

  componentDidMount(){
  var el=ReactDOM.findDOMNode(this);
  d3chart.create(el, {
      width: '100%',
      height: '90%'
    }, this.getChartState());
    d3chart.update(el, this.getChartState());
  }

  componentDidUpdate(){
    var el = ReactDOM.findDOMNode(this);
    d3chart.update(el, this.getChartState());
  }

  handleOpenTooltip(d){
    this.props.onOpenTooltip(d);
  }

  getChartState(){
    return {
      events: this.props.events,
      domain: this.props.domain,
      yaxisKeywords: this.props.yaxisKeywords,
      timelineKeywords: this.props.timelineKeywords,
      clickHandler: this.handleOpenTooltip,
      tooltipState: this.props.tooltipState
    };
  }

  componentWillUnmount(){
    var el = ReactDOM.findDOMNode(this);
    d3chart.destroy(el);
  }

  render(){
    return(
      <div className="TimelineBody" />
    )
  }
}
