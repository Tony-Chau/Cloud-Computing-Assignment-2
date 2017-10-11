const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());

app.listen(3000, function(){
  console.log('Express app listening at http://localhost:3000/');
});
