var d3 = require('d3');
var d3chart = {};

d3chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
  .attr('class','d3-root')
  .attr('width',props.width)
  .attr('height',props.height);
  svg.append('g')
  .attr('class','d3-yaxis');
  svg.append('g')
  .attr('class','d3-xaxis');
  svg.append('g')
  .attr('class','gridlines');
  svg.append('g')
  .attr('class','timelines');
  d3.select(el).append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);
};

d3chart.update = function(el, state) {
  var svg = d3.select(el).select(".d3-root");
  var yscale = this._yscale(el, state.yaxisKeywords);
  var xscale = this._buildAxes(el, yscale, state);
  var scales = {yscale: yscale, xscale: xscale};
  this._drawTimelines(el, scales, state);
  this._drawTooltip(el, state, scales);
  svg.on('click', function(d){
    state.clickHandler(null);
  });

};

d3chart.destroy = function(el) {
};

d3chart._yscale = function(el, domain) {
  return d3.scaleBand().domain(domain).range([0, el.offsetHeight-30]);
};

d3chart._xscale = function(el, domain, offset) {
  return d3.scaleTime().domain(domain).range([offset, el.offsetWidth-10]);
};

d3chart._drawTooltip = function(el, state, scales){
  var tooltipDiv = d3.select(el).select('.tooltip');
  if(state.tooltipState!=null){
    tooltipDiv.style('opacity', 0.9);
    var tooltipText = '';
    for (var i = 0; i<state.tooltipState.events.length; i++){
      tooltipText = tooltipText+'<h5>'+state.tooltipState.events[i].time.toDateString() + '</h5>';
      tooltipText = tooltipText + state.tooltipState.events[i].desc + '<br />'
    }
    tooltipDiv.html(tooltipText)
    if(state.tooltipState.xsvg<0.5){
      tooltipDiv.style('left', (state.tooltipState.x+5) + 'px')
      .style('top', (state.tooltipState.y)+'px');
    }else{
      tooltipDiv.style('left', (state.tooltipState.x-305) + 'px')
      .style('top', (state.tooltipState.y-5)+'px');
    }
  }else{
    tooltipDiv.style('opacity', 0);
  }
}

d3chart._buildAxes = function(el, yscale, state){
  var svg = d3.select(el).select(".d3-root");
  var yaxis = d3.axisLeft(yscale);
  var yaxisElement = svg.select('.d3-yaxis')
  .call(yaxis);
  var yaxisWidth = yaxisElement.node().getBBox().width;
  yaxisElement.attr("transform", "translate(" + yaxisWidth + ",0)");
  var xscale = this._xscale(el, state.domain, yaxisWidth);
  var xaxis = d3.axisBottom(xscale).tickFormat(d3.timeFormat("%m-%d")).ticks(3);
  var xaxisElement=svg.select('.d3-xaxis').call(xaxis);
  xaxisElement.attr("transform", "translate(0," + (el.offsetHeight-30) + ")");
  this._drawGridlines(el,yscale);
  return xscale;
};

d3chart._drawGridlines = function(el, yscale){
  var gridlinePositions = [];
  for(var i=0; i<yscale.domain().length; i++){
    gridlinePositions.push(i*yscale.bandwidth());
  }
  var gridline = d3.select(el)
  .select('.gridlines')
  .selectAll('line')
  .data(gridlinePositions);

  gridline.enter().append('line')
  .merge(gridline)
  .attr('x1',0)
  .attr('x2', el.offsetWidth)
  .attr('y1', function(d){return d})
  .attr('y2', function(d){return d});

  gridline.exit().remove();
}


d3chart._drawTimelines = function(el, scales, state){
  var colors = ['black', 'red', 'blue', 'green', 'orange', 'cyan', 'DarkGrey', 'LightCoral', 'Olive', 'MidnightBlue'];

  var eventPoints = this._groupEventPoints(scales, state.events);
  var lineCoords = this._generateLineCoords(scales, eventPoints);

  var timelineGroupsPoints = d3.select(el)
  .select('.timelines')
  .selectAll('g .timeline-groups-points')
  .data(eventPoints, function(d,i){return i});

  timelineGroupsPoints.enter()
  .append('g')
  .attr('class', 'timeline-groups-points')
  .merge(timelineGroupsPoints)
  .attr("transform", function(d,i){
    return "translate(0,"+(i+1)*scales.yscale.bandwidth()/(state.events.length+1)+")"})
  .attr('fill', function(d,i){return colors[i]})
  .attr('stroke', function(d,i){return colors[i]});

  var points = d3.select(el).select('.timelines')
    .selectAll('.timeline-groups-points')
    .selectAll('circle')
    .data(function(d){return d}, function(d,i){return i});

  points.enter()
    .append('circle')
    .merge(points)
    .attr('r', 5)
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return scales.yscale(d.yaxisKeyword)})
    .on('click', function(d){
      state.clickHandler({events: d.events, x: d3.event.pageX, y: d3.event.pageY, xsvg: d.x/scales.xscale.range()[1]});
      d3.event.stopPropagation();
    });

  var timelineGroupsLines = d3.select(el).select('.timelines')
    .selectAll('g .timeline-groups-lines')
    .data(lineCoords, function(d,i){return i});

  timelineGroupsLines.enter()
    .append('g')
    .attr('class', 'timeline-groups-lines')
    .merge(timelineGroupsLines)
    .attr("transform", function(d,i){
      return "translate(0,"+(i+1)*scales.yscale.bandwidth()/(state.events.length+1)+")"})
    .attr('fill', function(d,i){return colors[i]})
    .attr('stroke', function(d,i){return colors[i]});


  var lines = d3.select(el).select('.timelines')
    .selectAll('.timeline-groups-lines').selectAll('line')
    .data(function(d){return d}, function(d,i){return i});

  lines.enter().append('line')
    .merge(lines)
    .attr('class', 'linesTimeline')
    .attr('x1',function(d){return d.x1})
    .attr('x2',function(d){return d.x2})
    .attr('y1',function(d){return d.y1})
    .attr('y2',function(d){return d.y2});

  timelineGroupsPoints.exit().remove();
  timelineGroupsLines.exit().remove();
  points.exit().remove();
  lines.exit().remove();
};

d3chart._groupEventPoints = function(scales, events){
  var eventPoints=[];
  for (var i = 0; i<events.length; i++){
    var currentX = null;
    var k=0;
    eventPoints[i] = [];
    for (var j=0; j<events[i].length; j++){
      if(currentX==null || scales.xscale(events[i][j].event.time)>currentX+15){
        currentX = scales.xscale(events[i][j].event.time);
        eventPoints[i].push({x: currentX,
          yaxisKeyword: events[i][j].yaxisKeyword,
          events: [events[i][j].event]});
      }else{
        k=eventPoints[i].length-1;
        while(k>=0){
          if(eventPoints[i][k].x==currentX && eventPoints[i][k].yaxisKeyword==events[i][j].yaxisKeyword){
            eventPoints[i][k].events.push(events[i][j].event);
            break;
          }else if(eventPoints[i][k].x<currentX || k==0){
            eventPoints[i].push({x: currentX,
            yaxisKeyword: events[i][j].yaxisKeyword,
            events: [events[i][j].event]});
            break;
          }else{
            k--;
          }
        }
      }
    }
  }
  return eventPoints;
}

d3chart._generateLineCoords = function(scales, eventPoints){
var lineCoords = [];
  if(eventPoints!=null){
    for(var i=0; i<eventPoints.length; i++){
      lineCoords[i] = [];
      for(var j=0; j<eventPoints[i].length; j++){
        var k=j;
        var middlex = null;
        while(k>=0){
          if(eventPoints[i][k].x!=eventPoints[i][j].x && middlex==null){
            middlex = eventPoints[i][k].x
          }
          if(eventPoints[i][k].x==middlex && eventPoints[i][j].yaxisKeyword==eventPoints[i][k].yaxisKeyword){
            lineCoords[i].push({x1: eventPoints[i][j].x, x2: middlex, y1: scales.yscale(eventPoints[i][j].yaxisKeyword), y2: scales.yscale(eventPoints[i][j].yaxisKeyword)});
            break;
          }
          if(middlex!=null && eventPoints[i][k].x<middlex){
            break;
          }
          k--;
        }
      }
    }
  return lineCoords;
  }else{
    return null;
  }
}

export default d3chart;
