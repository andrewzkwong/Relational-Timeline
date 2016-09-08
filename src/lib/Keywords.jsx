import React from 'react';
import ReactDOM from 'react-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { SelectableGroup, createSelectable } from 'react-selectable';
import 'bootstrap-webpack';

export default class Keywords extends React.Component{
  constructor(props){
    super(props);
    this.handleClickYAxis = this.handleClickYAxis.bind(this);
    this.handleClickTimeline = this.handleClickTimeline.bind(this);
  }

  handleClickYAxis(){
    var optionsList = ReactDOM.findDOMNode(this.forms).options;
    var selectedKeywords = [];
    for (var i=0; i<optionsList.length; i++) {
      if (optionsList[i].selected){
        selectedKeywords.push(optionsList[i].value);
      }
    }
    this.props.onSendYaxis(selectedKeywords);
  }

  handleClickTimeline(){
    var optionsList = ReactDOM.findDOMNode(this.forms).options;
    var selectedKeywords = [];
    for (var i=0; i<optionsList.length; i++) {
      if (optionsList[i].selected){
        selectedKeywords.push(optionsList[i].value);
      }
    }
    this.props.onSendTimeline(selectedKeywords);
  }

  render (){
    return (
      <Panel collapsible defaultExpanded header="Keywords">
          <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" ref={(c)=>this.forms=c} onChange={this.handleSelect} multiple>
              <option value="select">select (multiple)</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
          <Button onClick={this.handleClickYAxis}>
            To Y-Axis
          </Button>
          <Button onClick={this.handleClickTimeline}>
            To Timeline
          </Button>
      </Panel>
    );
  }
}
