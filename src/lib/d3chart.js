var d3 = require('d3');

var ANIMATION_DURATION = 400;
var TOOLTIP_WIDTH = 30;
var TOOLTIP_HEIGHT = 30;

var ns = {};

ns.create = function(el, props, state) {
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
};

ns._buildAxes = function(el, yscale, state){
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
};

ns._drawGridlines = function(el, yscale){
  var gridlinePositions = [];
  for(var i=0; i<yscale.domain().length; i++){
    gridlinePositions.push(i*yscale.bandwidth());
  }
  var gridline = d3.select(el)
    .select('.gridlines')
    .selectAll('line')
    .data(gridlinePositions, function(d){return d});

  gridline.enter().append('line')
    .attr('x1',0)
    .attr('x2', el.offsetWidth)
    .attr('y1', function(d){return d})
    .attr('y2', function(d){return d});

  gridline.exit().remove();
}


ns.update = function(el, state) {
  var yscale = this._yscale(el, state.yKeywords);
  this._buildAxes(el, yscale, state);
};

ns._yscale = function(el, domain) {
  return d3.scaleBand().domain(domain).range([0, el.offsetHeight-30]);
};

ns._xscale = function(el, domain, offset) {
  return d3.scaleTime().domain(domain).range([offset, el.offsetWidth]);
};

ns._drawTimelines = function(el, scales, state){
  var filteredEvents = [[[]]];
  for (var i = 0; i<state.data.length; i++){
    for (var j=0; j<state.timelineKeywords.length; j++){
      if (state.data[i].keywords.includes(state.timelineKeywords[j]){
        for (var k=0; k<state.yKeywords.length; k++){
          if(state.data[i].keywords.includes(state.yKeywords[k]){
            filteredEvents[j][k].push(state.data[i]);
          }
        }
      }
    }
  }



};

ns.destroy = function(el) {
};

export default ns;
