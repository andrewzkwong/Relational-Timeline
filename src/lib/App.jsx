import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import 'bootstrap-webpack';
var d3 = require('d3');

import Sidebar from './Sidebar';
import Timeline from './Timeline';

export default class App extends React.Component{
  constructor(props){
    super(props);
    var eventsData = [];
    for (var i=0; i<this.props.data.events.length; i++){
      eventsData[i] = this.props.data.events[i];
      eventsData[i].time = new Date(this.props.data.events[i].time)
    }
    this.keywords = ['All'].concat(this.props.data.keywords);
    this.sortedEvents = eventsData.sort(function(a,b){
      return a.time-b.time;
    });
    this.state = {windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    yaxisKeywords: ['All'],
    timelineKeywords: ['All'],
    tooltip: null,
    domain: [this.sortedEvents[0].time, this.sortedEvents[this.sortedEvents.length-1].time]};
    this.handleResize = this.handleResize.bind(this);
    this.sendYaxis = this.sendYaxis.bind(this);
    this.sendTimeline = this.sendTimeline.bind(this);
    this.handleOpenTooltip = this.handleOpenTooltip.bind(this);
    this.setYaxis = this.setYaxis.bind(this);
    this.setTimeline = this.setTimeline.bind(this);
    this.clearAction = this.clearAction.bind(this);
  }

  sendYaxis(keywords){
    var uniqueKeywords = this.state.yaxisKeywords.concat(keywords).filter(
      function(element, index, self){
        return index===self.indexOf(element);
      }
    );
    this.setState({yaxisKeywords: uniqueKeywords,
      tooltip: null
    });
  }

  sendTimeline(keywords){
    var concatenatedKeywords = this.state.timelineKeywords.concat(keywords)
    var uniqueKeywords = concatenatedKeywords.filter(
      function(element, index, self){
        return index===self.indexOf(element);
      }
    );
    this.setState({timelineKeywords: uniqueKeywords,
    tooltip: null});
  }

  setYaxis(keywords){
    this.setState({yaxisKeywords: keywords,
    tooltip: null});
  }

  setTimeline(keywords){
    this.setState({timelineKeywords: keywords,
      tooltip: null});
  }


  clearAction(){
    this.setState({timelineKeywords: [],
                  yaxisKeywords: [],
                  tooltip: null});
  }

  handleResize(){
    this.setState({windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth,
                    tooltip: null});
  }

  handleOpenTooltip(opened){
    this.setState({tooltip: opened});
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
  }

  render (){
    var filteredEvents = [];
    for (var j=0; j<this.state.timelineKeywords.length; j++){
      filteredEvents[j] = [];
    }
    for (var i = 0; i<this.props.data.events.length; i++){
      for (var j=0; j<this.state.timelineKeywords.length; j++){
        if (this.state.timelineKeywords[j]=='All' || this.props.data.events[i].keywords.includes(this.state.timelineKeywords[j])){
          for (var k=0; k<this.state.yaxisKeywords.length; k++){
            if(this.state.yaxisKeywords[k]=='All' || this.props.data.events[i].keywords.includes(this.state.yaxisKeywords[k])){
              filteredEvents[j].push({yaxisKeyword: this.state.yaxisKeywords[k], event: this.props.data.events[i]});
            }
          }
        }
      }
    }
      return (
      <Grid className="appGrid" fluid={true}>
        <Row>
        <Col sm={2} xs={4} className="sidebarColumn">
          <Panel>
          <Sidebar windowHeight={this.state.windowHeight}
            onSendYaxis={this.sendYaxis}
            onSendTimeline = {this.sendTimeline}
            onSetYaxis={this.setYaxis}
            onSetTimeline = {this.setTimeline}
            onClearAction = {this.clearAction}
            keywords={this.keywords}
            presets={this.props.data.presets}
            timelineKeywords={this.state.timelineKeywords}/>
          </Panel>
        </Col>
        <Col sm={10} xs={8} className="timelineColumn">
          <Timeline windowHeight={this.state.windowHeight}
            windowWidth={this.state.windowWidth}
            domain={this.state.domain}
            yaxisKeywords={this.state.yaxisKeywords}
            timelineKeywords={this.state.timelineKeywords}
            events={filteredEvents}
            onOpenTooltip={this.handleOpenTooltip}
            tooltipState={this.state.tooltip}/>
        </Col>
      </Row>
      </Grid>
    );
  }
}
