var graphObject = document.getElementById('graphDiv');

function getSearch(send){
  var topHash= x[i];
  var topPoint= y[i];
}

// var twitterGraph = {
//   x: ['giraffes', 'orangutans', 'monkeys', 'a','b','c','d','e','f', 'g'],
//   y: [20, 14, 23, 1, 2, 3, 4, 5, 2, 30],
//   name: 'Top 10 Hashtag Search',
//   type: 'bar'
// };

var twitterGraph = {
  x: topHash,
  y: topPoint,
  name: 'Top 10 Hashtag Search',
  type: 'bar'
};


var data = [twitterGraph];

var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.4)};

Plotly.newPlot(graphObject, data, layout);
