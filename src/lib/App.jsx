import React from 'react';
import ReactDOM from 'react-dom';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import 'bootstrap-webpack';

import Sidebar from './Sidebar';
import Timeline from './Timeline';

var d3 = require('d3');

export default class App extends React.Component{
  constructor(props){
    super(props);
    var eventsData = [];
    for (var i=0; i<this.props.data.events.length; i++){
      eventsData[i] = this.props.data.events[i];
      eventsData[i].time = new Date(this.props.data.events[i].time)
    }
    this.sortedEvents = eventsData.sort(function(a,b){
      return a.time-b.time;
    });
    this.state = {windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    yaxisKeywords: ['All'],
    keywordsTimeline: ['All'],
    xdomain: [this.sortedEvents[0].time, this.sortedEvents[this.sortedEvents.length-1].time]};
    this.handleResize = this.handleResize.bind(this);
    this.sendYaxis = this.sendYaxis.bind(this);
    this.sendTimeline = this.sendTimeline.bind(this);
  }

  sendYaxis(keywords){
    var uniqueKeywords = this.state.keywordsYaxis.concat(keywords).filter(
      function(element, index, self){
        return index===self.indexOf(element);
      }
    );
    this.setState({yaxisKeywords: uniqueKeywords});
  }

  sendTimeline(keywords){
    var concatenatedKeywords = this.state.keywordsTimeline.concat(keywords)
    var uniqueKeywords = concatenatedKeywords.filter(
      function(element, index, self){
        return index===self.indexOf(element);
      }
    );
    this.setState({keywordsTimeline: uniqueKeywords});
  }

  handleResize(){
    this.setState({windowHeight: window.innerHeight,
                    windowWidth: window.innerWidth});
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
  }

  render (){
    return (
      <Grid className="appGrid" fluid={true}>
        <Row>
        <Col sm={2} xs={4} className="sidebarColumn">
          <Panel>
          <Sidebar windowHeight={this.state.windowHeight}
            onSendYaxis={this.sendYaxis}
            onSendTimeline = {this.sendTimeline}/>
          </Panel>
        </Col>
        <Col sm={10} xs={8} className="timelineColumn">
          <Timeline windowHeight={this.state.windowHeight}
            windowWidth={this.state.windowWidth}
            domain={this.state.xdomain}
            yaxisKeywords={this.state.yaxisKeywords}
            timelines={this.state.keywordsTimeline}
            />
        </Col>
      </Row>
      </Grid>
    );
  }
}
