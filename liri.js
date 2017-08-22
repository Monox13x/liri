var key = require("./keys.js");
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var client = new twitter(key.twitterKeys);
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
 id:"68b5ced3b866410e840b6046777a5c0f",
 secret:"dae12c1753f34a82ab37021bc7b2a20a"
});

var params = { screen_name: 'AndrewRuiz92', count: 20 };

var command = process.argv[2];
var value = process.argv[3];

switch (command) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        omdbThis();
        break;
    case 'do-what-it-says':
        random();
        break;
}

 function getTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
  
      if (!error) {
        var data = []; 
        for (var i = 0; i < tweets.length; i++) {
          data.push({
              'created at: ' : tweets[i].created_at,
              'Tweets: ' : tweets[i].text,
          });
        }
        console.log(data);
      }
    });
  }

function spotifyThis(value) {
    if (value == null) {
        value = 'The Sign';
    }
    request("https://api.spotify.com/v1/search?q=" + value+ "&type=track&access_token=BQA698-Nw6eKZnaNhh9EF4Y0H0G3OLrDU02gBjeDx05p6ZKU2-8DRJ6Mafv-3KBlDhMcq2wC5vQID3DXA5YD9LCYOXVNGjr0O0Gxq1voz6GBOuBOXwJvrSb9d33wFYLJWfUcFHVl", function(error, response, body) {
        //if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log(' ');   
        //}
    })
   
}



function omdbThis() {
    if (value == null) {
        value = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.Ratings[1].Value);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            
            console.log(' ');
            
        }
    });
}

function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                spotifyThis(dataArr[1]);
               
            }
            
        }
    });
}
