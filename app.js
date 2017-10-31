const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const twitterRouter = require('./router/mainroute.js');
app.listen(3000, message);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(twitterRouter);

app.use(express.static(path.join(__dirname, 'public')));


function message(){
  console.log("Express app listening at http://localhost:3000/");
}
