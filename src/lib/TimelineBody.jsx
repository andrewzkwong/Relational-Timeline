import React from 'react';
import ReactDOM from 'react-dom';

import d3chart from './d3chart.js';

export default class TimelineBody extends React.Component{
  constructor(props){
    super(props);
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

  getChartState(){
    return {
      data: this.props.data,
      domain: this.props.domain,
      yKeywords: this.props.keywords
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
