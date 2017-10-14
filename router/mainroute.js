const express = require('express');
const app = express();
const router = express.Router();
const MongoServer = require('./functions/mongodb.js');


router.get('/', function(req, res){
    res.render('index', {
        Title: 'green'
    });
});

module.exports = router;