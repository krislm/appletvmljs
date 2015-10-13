/**
 * Created by kris on 13/10/15.
 */

var movie = require('./routes/movies.js');

App.onLaunch = function (options) {
	var BaseURl = options.BASEURL;

	showLoadingScreen(BaseURl);
};

App.onExit = function() {
	console.log('App finished');
};

function showLoadingScreen() {
	var loadingString = `<?xml version="1.0" encoding="UTF-8" ?>
	<document>
	   <head>
		  .centerImg { margin: 0 0 0 625; }
	   </head>
	   <descriptiveAlertTemplate>
		  <title>Hello!</title>
		  <img class="centerImg" src="http://tevp.net/images/collection/funny/catz/proceed%20kitty.jpg" width="500" height="500"/>
		  <row>
			  <button>
				 <text>Yes</text>
			  </button>
			  <button>
				 <text>No</text>
			  </button>
		  </row>
	   </descriptiveAlertTemplate>
	</document>`;

	var parser = new DOMParser();

	var loadingDoc = parser.parseFromString(loadingString, "application/xml");

	loadingDoc.addEventListener("select", function(event) {
		movie.getMovies();
	});

	navigationDocument.presentModal(loadingDoc);
}