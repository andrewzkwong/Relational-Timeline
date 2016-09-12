import React from 'react';
import ReactDOM from 'react-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

export default class Presets extends React.Component{
  constructor(props){
    super(props);
    this.handleClickApply = this.handleClickApply.bind(this);
  }

  handleClickApply(){
    var optionsList = ReactDOM.findDOMNode(this.forms).options;
    this.props.onSetTimeline(this.props.presets[optionsList.selectedIndex].timelineKeywords);
    this.props.onSetYaxis(this.props.presets[optionsList.selectedIndex].yaxisKeywords);
  }

  render (){
    var optionList = this.props.presets.map(function(d){
      return(<option value={d} key={d.name}>{d.name}</option>)
    })
    return (
      <Panel collapsible defaultExpanded header="Preset Timelines">
        <FormGroup controlId="formControlsSelect">
          <FormControl componentClass="select"
              ref={(c)=>this.forms=c}>
              {optionList}
          </FormControl>
        </FormGroup>
        <Button onClick={this.handleClickApply}>
          Apply
        </Button>
      </Panel>
      );
    }
}
