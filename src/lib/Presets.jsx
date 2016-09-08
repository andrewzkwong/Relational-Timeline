import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import 'bootstrap-webpack';

export default class Presets extends React.Component{
  render (){
    return (
      <Panel collapsible defaultExpanded header="Preset Timelines">
        <ListGroup fill style={{"maxHeight":this.props.listHeight.toString(), "overflow":"auto"}}>
          <ListGroupItem>Item 1</ListGroupItem>
          <ListGroupItem>Item 2</ListGroupItem>
          <ListGroupItem>Item 3</ListGroupItem>
          <ListGroupItem>Item 4</ListGroupItem>
          <ListGroupItem>Item 5</ListGroupItem>
          <ListGroupItem>Item 6</ListGroupItem>
          <ListGroupItem>Item 7</ListGroupItem>
          <ListGroupItem>Item 8</ListGroupItem>
          <ListGroupItem>Item 9</ListGroupItem>
          <ListGroupItem>Item 0</ListGroupItem>
          <ListGroupItem>Item 11</ListGroupItem>
          <ListGroupItem>Item 12</ListGroupItem>
          <ListGroupItem>Item 13</ListGroupItem>
          <ListGroupItem>Item 14</ListGroupItem>
        </ListGroup>
        <Button>
          Apply
        </Button>
      </Panel>
    );
  }
}
