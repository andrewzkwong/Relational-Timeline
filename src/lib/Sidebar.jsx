import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import 'bootstrap-webpack';

import Presets from './Presets';
import Keywords from './Keywords';
import Legend from './Legend';

export default class Sidebar extends React.Component{
  render (){
    if (this.props.windowHeight > 400){
    var listHeight = this.props.windowHeight/2 - 250;
  } else{
    var listHeight = 100;
  }
    return (
      <div>
      <Keywords listHeight={listHeight}
        onSendYaxis={this.props.onSendYaxis}
        onSendTimeline = {this.props.onSendTimeline}
        keywords={this.props.keywords}/>
      <Presets listHeight={listHeight}
        onSetYaxis={this.props.onSetYaxis}
        onSetTimeline = {this.props.onSetTimeline}
        presets={this.props.presets}/>
      <Legend
        timelineKeywords={this.props.timelineKeywords}
        />
      <Button onClick={this.props.onClearAction}>
        Clear
      </Button>
    </div>
    );
  }
}
