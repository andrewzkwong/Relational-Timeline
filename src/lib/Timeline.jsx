import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';
import 'bootstrap-webpack';

import TimelineBody from './TimelineBody';

export default class Timeline extends React.Component{
  render (){
    return (
      <Panel style={{"maxWidth":"100%", "overflow":"auto"}}>
        <TimelineBody data={1} domain={this.props.domain} keywords={["John", "Adam"]} />
      </Panel>
    );
  }
}
