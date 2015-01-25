myApp.controller('SearchCtrl', function ($http, $location, searchSong, getLyrics, nowPlaying) {
	var searchctrl = this;

	searchctrl.query = '';
	searchctrl.searchResults;

	searchctrl.searchSong = function(q) {
		var value = q.trim();
		if(value.length) {
			searchSong(value)
				.then(function(response) {
					// console.log('ssResponse', response);
					var tracks = response.message.body.track_list;
					var goodTracks = [];

					for (var i = 0; i < tracks.length; i++) {
						if(tracks[i].track.track_spotify_id && tracks[i].track.has_lyrics) {
							goodTracks.push(tracks[i]);
						}
					}

					searchctrl.searchResults = goodTracks;;
					// searchctrl.searchResults = tracks;;
				});
		}	
	} // end searchSong()

	searchctrl.getSong = function(track) {
		nowPlaying.artist = track.artist_name;
		nowPlaying.song = track.track_name;
		nowPlaying.album = track.album_name;
		nowPlaying.art = track.album_coverart_500x500;
		nowPlaying.spotifyId = track.track_spotify_id;

		getLyrics(track.track_id)
			.then(function(response) {

				// oddly, this had to change from response.data.message..... to response.message....
				// var tracking = response.data.message.body.lyrics.pixel_tracking_url;
				// var lyrics = response.data.message.body.lyrics.lyrics_body;
				var tracking = response.message.body.lyrics.pixel_tracking_url;
				var lyrics = response.message.body.lyrics.lyrics_body;

				console.log('lyrics_body', lyrics);

				lyrics = lyrics.replace(/’/g, "'");
				lyrics = lyrics.replace(/‘/g, "'");
				lyrics = lyrics.replace(/'/g, "\'");
				lyrics = lyrics.replace(/ \n\n\n/g, ' ');
				lyrics = lyrics.replace(/\n\n\n/g, ' ');
				lyrics = lyrics.replace(/ \n\n/g, ' ');
				lyrics = lyrics.replace(/\n\n/g, ' ');
				lyrics = lyrics.replace(/ \n/g, ' ');
				lyrics = lyrics.replace(/\n/g, ' ').split(' ');
				lyrics.splice(lyrics.length-11, 11);
				
				for (var i = 1; i < lyrics.length; i += 2) {
					lyrics.splice(i, 0, ' ');
				};

				nowPlaying.lyrics = lyrics;				
				nowPlaying.tracking = tracking;
				$location.path('/play');
			}); //end then()
	} // end getSong()

	$('.query').focus();
}); //end SearchCtrl