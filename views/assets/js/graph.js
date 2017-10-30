onload = function getData(){
  $.get('/GetQueries', function (data){
      createGraph(data);
  });
}

function createGraph(data){
  var graphObject = document.getElementById('graphDiv');
  var twitterGraph = {
    x: data.topHash,
    y: data.topPoint,
    name: 'Top 10 Hashtag Search',
    type: 'bar'
  };

  var data = [twitterGraph];
  var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.3)};

  Plotly.newPlot(graphObject, data, layout);
  $('#twitterDiv').html(twitterTable(data));
}

function twitterTable(data){
  var graphObject = document.getElementById('twitterDiv');
  alert(data.topHash);
  var s = "";
  s = '<table class="table table-boardered">';
  s += '<thread>';
  s += '<tr>';
  s += '<th>Ranking</th>';
  s += '<th>Top Hashtag</th>';
  s += '<th>Hastage Frequency</th>';
  s += '</tr>';
  s += '</thread>';
  s += '<tbody>';

  for (var i=0; i < 10; i++){
    s += '<tr>';
    s += '<td>' + (i+1) + '</td>';
    s += '<td>' + data.topHash[i] + '</td>';
    s += '<td>' + data.topPoint[i] + '</td>';
    s += '</tr>';
  }
  s += '</tbody>';
  s += '</table>';
  return s
}


// function getSearch(send){
//   var topHash= x[i];
//   var topPoint= y[i];
// }

// var twitterGraph = {
//   x: ['giraffes', 'orangutans', 'monkeys', 'a','b','c','d','e','f', 'g'],
//   y: [20, 14, 23, 1, 2, 3, 4, 5, 2, 30],
//   name: 'Top 10 Hashtag Search',
//   type: 'bar'
// };
