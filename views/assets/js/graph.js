function getData(){
  var q = document.getElementById('query').value;
  $.get('/GetQueries?q=' + q, function (data){
    createGraph(data);
    });
    loadBarTimer();
setInterval(function(){
  $.get('/GetQueries?q=' + q, function (data){
    createGraph(data);
    });
    loadBarTimer();
  }, 30000);
}
window.onload = function(){
  getData();
}

function createGraph(data){
  var graphObject = document.getElementById('graphDiv');
  var twitterGraph = {
    x: data.topHash,
    y: data.topPoint,
    name: 'Top 10 Hashtag Search',
    type: 'bar'
  };

  var twitterData = [twitterGraph];
  var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.3)};
  Plotly.newPlot(graphObject, twitterData, layout);
  $('#twitterDiv').html(twitterTable(data.hash, data.point));
}

function twitterTable(Hash, Point){
  var graphObject = document.getElementById('twitterDiv');
  var s = '<h1>Hashtag Result</h1><table class="table table-boardered">';
  s += '<thread>';
  s += '<tr>';
  s += '<th>Ranking</th>';
  s += '<th>Top Hashtag</th>';
  s += '<th>Number of "#" Calls</th>';
  s += '</tr>';
  s += '</thread>';
  s += '<tbody>';

  for (var i=0; i < Hash.length; i++){
    s += '<tr>';
    s += '<td>' + (i+1) + '</td>';
    s += '<td>' + Hash[i] + '</td>';
    s += '<td>' + Point[i] + '</td>';
    s += '</tr>';
  }
  s += '</tbody>';
  s += '</table>';
  return s
}


//Taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_progressbar_3

function loadBarTimer() {
  var elem = document.getElementById("loadBar");
  var width = 1;
  var id = setInterval(frame, 200);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      $('#loadBar').css('display', 'none');
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}
