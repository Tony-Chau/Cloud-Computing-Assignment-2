// var data = [
//   {
//     x: ['giraffes', 'orangutans', 'monkeys'],
//     y: [20, 14, 23],
//     type: 'bar'
//   }
// ];
//
// Plotly.newPlot('myDiv', data);
// var plotly = require('plotly')("allan1q2w", "Ego72h93Mkz4ACfZ20uC")

var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
var layout = {fileopt : "overwrite", filename : "simple-node-example"};

plotly.plot(data, layout, function (err, msg) {
	if (err) return console.log(err);
	console.log('hello');
});
