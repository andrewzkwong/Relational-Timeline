import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';

export default class Legend extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var colors = ['black', 'red', 'blue', 'green', 'orange', 'cyan', 'DarkGrey', 'LightCoral', 'Olive', 'MidnightBlue'];
    var legendList = this.props.timelineKeywords.map(function(d,i){
      return(<p key={i}><span className='legendEntry' style={{'background-color': colors[i]}}></span>{d}</p>)
    });
    return(
      <Panel defaultExpanded header="Legend">
        <div className='legend'>
          {legendList}
        </div>
      </Panel>
    )
  }
}
