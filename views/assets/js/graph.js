var interval;
function getData(){
  var q = document.getElementById('query').value;
  $.get('/GetQueries?q=' + q, function (data){
    createBarGraph(data);
    createhorBarGraph(data);
    createPieGraph(data);
    });
    loadBarTimer();
interval = setInterval(function(){
  $.get('/GetQueries?q=' + q, function (data){
    createBarGraph(data);
    createhorBarGraph(data);
    createPieGraph(data);
    });
    //loadBarTimer();
  }, 1);
}

//Generate Horizontal Bar Graph
function createhorBarGraph(data){
  if (data.point == undefined){
    window.location.href = '/error';
  }
  var graphObject = document.getElementById('horbarGraphDiv');
  var twitterGraph = {
    x: (data.topPoint).reverse(),
    y: (data.topHash).reverse(),
    title: 'top ' + data.topPoint.length + ' horizontal bar graph for ' + document.getElementById('query').value,
    type: 'bar',
    orientation: 'h'
  };

  var twitterData = [twitterGraph];
  var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.3)};
  Plotly.newPlot(graphObject, twitterData, layout);
  $('#twitterDiv').html(twitterTable(data.hash, data.point));
}

//Generate Bar Graph
function createBarGraph(data){
  if (data.point == undefined){
    window.location.href = '/error';
  }
  var graphObject = document.getElementById('barGraphDiv');
  var twitterGraph = {
    x: data.topHash,
    y: data.topPoint,
    title: 'top ' + data.topPoint.length + ' bar graph for ' + document.getElementById('query').value,
    type: 'bar'
  };

  var twitterData = [twitterGraph];
  var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.3)};
  Plotly.newPlot(graphObject, twitterData, layout);
  $('#twitterDiv').html(twitterTable(data.hash, data.point));
}

//Generate Pie Graph
function createPieGraph(data){
  if (data.point == undefined){
    window.location.href = '/error';
  }
  var graphObject = document.getElementById('pieGraphDiv');
  var twitterGraph = {
    labels: data.topHash,
    values: data.topPoint,
    name: 'Top 10 Hashtag Search',
    type: 'pie'
  };

  var twitterData = [twitterGraph];
  var layout = {barmode: 'group', width: (window.innerWidth/1.3), height: (window.innerHeight/1.2)};
  Plotly.newPlot(graphObject, twitterData, layout);
  $('#twitterDiv').html(twitterTable(data.hash, data.point));
}

//Functionality for tab bar
// got from https://www.w3schools.com/howto/howto_js_tabs.asp
function tabMenu(evt, graphType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(graphType).style.display = "block";
    document.getElementById(graphType.replace('Div', 'tab')).classList.add('active');
    // evt.currentTarget.className += 'active';
}

//Generates table list of hashtag ranking
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

//Loading bar functionality
// Taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_progressbar_3
function loadBarTimer() {
  var elem = document.getElementById("loadBar");
  var width = 1;
  var id = setInterval(frame, 600);
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
//calls the getData function when window onload
window.onload = function(){
  getData();
}
window.onunload = clearInterval(interval); 
//sets the bargraphtab active
$('#barGraphtab').click();
