var fs = require('fs');
var path    = require("path");

var express = require('express');
var _ = require('lodash');

var app = express();


app.set('views', './build/pug');
app.use('/static', express.static('build'))

var stats = JSON.parse(fs.readFileSync('stats.json')).stats;
_.each(stats, function(stat){
    stat.id = _.uniqueId();
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/build/html/index.html'));
});

app.get('/api/stat/random', function(req, res){
    res.json(_.sample(stats));
});

app.listen(8888, function(){
    console.log('Example app listening on port 8888!');
});