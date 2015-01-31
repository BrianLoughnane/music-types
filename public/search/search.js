myApp.controller('SearchCtrl', function (querySong, getSong) {
	$('.query').focus();
	var searchctrl = this;
	searchctrl.query = '';
	searchctrl.searchResults;
	searchctrl.searchSong = querySong(searchctrl);
	searchctrl.getSong = getSong;
}); //end SearchCtrl
