import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';
import 'bootstrap-webpack';

import TimelineBody from './TimelineBody';

export default class Timeline extends React.Component{
  render (){
    return (
      <Panel style={{"maxWidth":"100%", "overflow":"auto"}}>
        <TimelineBody
          domain={this.props.domain}
          yaxisKeywords={this.props.yaxisKeywords}
          timelineKeywords={this.props.timelineKeywords}
          events={this.props.events}
          onOpenTooltip={this.props.onOpenTooltip}
          tooltipState={this.props.tooltipState} />
      </Panel>
    );
  }
}
