/**
 * Created by kris on 13/10/15.
 */

var q = require('q'),
	xhr = require('../services/xhrService.js'),
	alert = require('../services/alertService.js'),
	builder = require('../services/documentService.js');

function MovieController() {
	var that = this;

	this.template = ``;

	this.movie = {};

	this.generateMovieTemplate = function() {
		that.template = `<?xml version="1.0" encoding="UTF-8" ?>
			<document>
				<productTemplate>
					<banner>
						<infoList>
							<info>
							   <header>
								  <title>Director</title>
							   </header>
							   <text>${that.movie.Director}</text>
							</info>
							<info>
							   <header>
								  <title>Actors</title>
							   </header>
							   <text>${that.movie.Actors}</text>
							</info>
						</infoList>
						<stack>
							<title>${that.movie.Title}</title>
							<row>
							   <text><badge src="resource://tomato-fresh"/> 99%</text>
							   <text>1hr 54min</text>
							   <text>${that.movie.Genre}</text>
							   <text>${that.movie.Released}</text>
							   <badge src="resource://mpaa-pg" class="badge" />
							   <badge src="resource://cc" class="badge" />
							</row>
							<description allowsZooming="true" moreLabel="more">${that.movie.Plot}</description>
							<text>${that.movie.Language}</text>
							<row>
							   <buttonLockup>
								  <badge src="resource://button-preview" />
								  <title>Preview</title>
							   </buttonLockup>
							   <buttonLockup type="buy">
								  <text>$9.99</text>
								  <title>Buy</title>
							   </buttonLockup>
							</row>
					 	</stack>
					 	<heroImg src="https://upload.wikimedia.org/wikipedia/en/6/62/Return_of_the_Jedi_(1997_re-release_poster).jpg" />
				  </banner>
				  <shelf>
					 <header>
						<title>Viewers Also Watched</title>
					 </header>
					 <section>
						<lockup>
						   <img src="http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/anewhopeposter.jpg" width="150" height="226" />
						   <title>A new hope</title>
						</lockup>
						<lockup>
						   <img src="https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg" width="150" height="226" />
						   <title>The empire strikes back</title>
						</lockup>
					 </section>
				  </shelf>

				  <shelf>
					 <header>
						<title>Reviews and Ratings</title>
					 </header>
					 <section>
						<ratingCard>
						   <title>4.1 / 5</title>
						   <ratingBadge value="0.7"></ratingBadge>
						   <description>Average of 2,241 iTunes user ratings and reviews.</description>
						</ratingCard>
						<ratingCard>
						   <title><badge src="resource://tomato-fresh" /> 99%</title>
						   <text>Tomatometer</text>
						   <infoTable>
							  <info>
								 <header>
									<title>175</title>
								 </header>
								 <text>Reviews</text>
							  </info>
							  <info>
								 <header>
									<title>173</title>
								 </header>
								 <text>Fresh</text>
							  </info>
							  <info>
								 <header>
									<title>2</title>
								 </header>
								 <text>Rotten</text>
							  </info>
						   </infoTable>
						</ratingCard>
						<reviewCard>
						   <badge src="resource://tomato-fresh-m" />
						   <title>WWDC Review</title>
						   <description>Brief review here</description>
						   <text>Ravi Patel June, 8 2015</text>
						</reviewCard>
					 </section>
				  </shelf>
				  <shelf>
					 <header>
						<title>Cast and Crew</title>
					 </header>
					 <section>
						<monogramLockup>
						   <monogram firstName="Anne" lastName="Johnson"/>
						   <title>Anne Johnson</title>
						   <subtitle>Actor</subtitle>
						</monogramLockup>
						<monogramLockup>
						   <monogram firstName="Tom" lastName="Clark"/>
						   <title>Tom Clark</title>
						   <subtitle>Actor</subtitle>
						</monogramLockup>
						<monogramLockup>
						   <monogram firstName="Maria" lastName="Ruiz"/>
						   <title>Maria Ruiz</title>
						   <subtitle>Actor</subtitle>
						</monogramLockup>
					 </section>
				  </shelf>
				  <productInfo>
					 <infoTable>
						<header>
						   <title>Information</title>
						</header>
						<info>
						   <header>
							  <title>Studio</title>
						   </header>
						   <text>Apple</text>
						</info>
						<info>
						   <header>
							  <title>Runtime</title>
						   </header>
						   <text>1:54</text>
						</info>
						<info>
						   <header>
							  <title>Format</title>
						   </header>
						   <text>Widescreen</text>
						</info>
					 </infoTable>
					 <infoTable>
						<header>
						   <title>Languages</title>
						</header>
						<info>
						   <header>
							  <title>Primary</title>
						   </header>
						   <text>English (Dolby 5.1), Subtitles, CC</text>
						</info>
						<info>
						   <header>
							  <title>Additional</title>
						   </header>
						   <text>Cantonese (Subtitles)</text>
						</info>
					 </infoTable>
					 <infoTable style="tv-line-spacing:10;">
						<header>
						   <title>Accessibility</title>
						</header>
						<info>
						   <header>
							  <textBadge>SDH</textBadge>
						   </header>
						   <text>Subtitles for the deaf and Hard of Hearing (SDH) refer to subtitles in the original lanuage with the addition of relevant non-dialog information.</text>
						</info>
					 </infoTable>
				  </productInfo>
				</productTemplate>
			</document>`;

	}
}

MovieController.prototype.getMovies = function() {
	var that = this;

	var req = {
		method: 'GET',
		url: 'http://omdbapi.com/?t=return+of+the+jedi&y=&plot=full&r=json',
		headers: [
			{'Accept': 'application/json, text/plain, */*'}
		]
	};

	xhr.apiRequest(req)
		.then(function(response) {
			console.log(response);
			that.movie = response;
			that.generateMovieTemplate();
		})
		.catch(function(error) {
			console.log(error);
			that.template = alert('Oh no,', 'bad stuff happened!');
		})
		.finally(function() {
			var doc = builder.buildDoc(that.template);
			navigationDocument.dismissModal();
			navigationDocument.pushDocument(doc);
		});
};

module.exports = new MovieController();