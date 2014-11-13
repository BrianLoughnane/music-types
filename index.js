var request = require('request');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var musicApiKey = '83c1f43d33f5abacda9ae5f1f1106dca';

app.get('/musicmatch/:band', function(req, res) {
    var apiUrl = "http://api.musixmatch.com/ws/1.1/track.search";
    var band = req.params.band;

    var urlStr = apiUrl + "?q=" + band + "&apikey=" + musicApiKey;
    request(urlStr).pipe(res);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})