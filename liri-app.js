require("dotenv").config();
const axios = require("axios");
const spotify = require("spotify-web-api-node");
const moment = require("moment");
const keys = require("./keys.js");

let apiRequested = process.argv[2];
let apiSearch = process.argv.slice(3);
let searchItem = apiSearch.join("+");

var bandsURL = "http://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp";
var omdbURL = "http://www.obdbapi.com/?t=" + searchItem + "&apikey=trilogy";

moment().format();

function searchSpotify() {
    spotify(keys.spotify);

    spotify.search({ type: "track", query: searchItem }, function(err, response) {
        if (err) {
            return err;
        }
        console.log(response);
    });
}

function searchBands() {
    axios.get(bandsURL).then(
        function(response) {
            console.log(response);
    });
}

function searchOmdb() {
    axios.get(omdbURL).then(
        function(response) {
            console.log(response);
        }
    );
}

if (apiRequested === "spotify") {
    searchSpotify();
}
else if (apiRequested === "concerts") {
    searchBands();
}
else if (apiRequested === "movies") {
    searchOmdb();
}

