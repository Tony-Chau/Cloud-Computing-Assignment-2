var TESTER = document.getElementById('myDiv');

// var data = [
// {
//   x: ['giraffes', 'orangutans', 'monkeys'],
//   y: [20, 14, 23],
//   type: 'bar'
// }
// ];
//
// Plotly.newPlot(TESTER, data);


var trace1 = {
  x: ['giraffes', 'orangutans', 'monkeys', 'a','b','c','d','e','f', 'g'],
  y: [20, 14, 23, 1, 2, 3, 4, 5, 2, 30],
  name: 'SF Zoo',
  type: 'bar'
};


var data = [trace1];

var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.3)};

Plotly.newPlot(TESTER, data, layout);
