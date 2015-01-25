describe('myApp', function() {
	beforeEach(module('myApp'));

	it('should create a module named "myApp"', function() {
		expect(myApp).toBeDefined();
	});
});

describe('nowPlaying', function() {
	beforeEach(module('myApp'));

	it('should return an object with certain properties', 
	inject(function(nowPlaying) {
		expect(typeof nowPlaying).toEqual('object');
		expect(nowPlaying.hasOwnProperty('lyrics')).toEqual(true);
		expect(nowPlaying.hasOwnProperty('artist')).toEqual(true);
		expect(nowPlaying.hasOwnProperty('song')).toEqual(true);
		expect(nowPlaying.hasOwnProperty('spotifyId')).toEqual(true);
		expect(nowPlaying.hasOwnProperty('tracking')).toEqual(true);
	}));
});

describe('searchSong', function() {
	beforeEach(module('myApp'));

	it('should return a function', 
	inject(function(searchSong) {
		expect(typeof searchSong).toEqual('function');
	}));

	it('the function returns a promise',
	inject(function(searchSong) {
		expect(typeof searchSong().then).toEqual('function');
	}));

	it('the function applied to a value queries musixmatch server', 
	inject(function(searchSong, $httpBackend) {
		var query = 'test'
		$httpBackend.expectGET('musicmatch/' + query).respond(200);
		searchSong(query);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));	

	it('upon success, the server query resolves the promise with it\'s response', 
	inject(function(searchSong, $httpBackend, $q) {
		var query = 'test'
		var response = {'test': 'response'};
		var returned;

		$httpBackend.whenGET('musicmatch/' + query).respond(response);
		
		returned = searchSong(query);
		
		$httpBackend.flush();

		expect(returned).toEqual($q(function(resolve) {
			resolve(response)
		}));

	}));	
});

describe('getLyrics', function() {
	beforeEach(module('myApp'));

	it('should return a function', 
	inject(function(getLyrics) {
		expect(typeof getLyrics).toEqual('function');
	}));

	it('the function returns a promise',
	inject(function(getLyrics) {
		expect(typeof getLyrics().then).toEqual('function');
	}));

	it('the function applied to a trackId queries musicmatch/lyrics/ server', 
	inject(function(getLyrics, $httpBackend) {
		var trackId = 'test'
		$httpBackend.expectGET('musicmatch/lyrics/' + trackId).respond(200);
		getLyrics(trackId);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));	

	it('upon success, the server query resolves the promise with it\'s response', 
	inject(function(getLyrics, $httpBackend, $q) {
		var trackId = 'test'
		var response = {'test': 'response'};
		var returned;

		$httpBackend.whenGET('musicmatch/lyrics/' + trackId).respond(response);
		
		returned = getLyrics(trackId);
		
		$httpBackend.flush();

		expect(returned).toEqual($q(function(resolve) {
			resolve(response)
		}));

	}));	
});

describe('getSpotify', function() {
	beforeEach(module('myApp'));

	it('should return a function', 
	inject(function(getSpotify) {
		expect(typeof getSpotify).toEqual('function');
	}));

	it('the function returns a promise',
	inject(function(getSpotify) {
		expect(typeof getSpotify().then).toEqual('function');
	}));

	it('the function applied to a spotifyId queries musicmatch/lyrics/ server', 
	inject(function(getSpotify, $httpBackend) {
		var spotifyId = 'test'
		$httpBackend.expectGET('https://api.spotify.com/v1/tracks/' + spotifyId).respond(200);
		getSpotify(spotifyId);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));	

	it('upon success, the server query resolves the promise with it\'s response', 
	inject(function(getSpotify, $httpBackend, $q) {
		var spotifyId = 'test'
		var response = {'git ctest': 'response'};
		var returned;

		$httpBackend.whenGET('https://api.spotify.com/v1/tracks/' + spotifyId).respond(response);
		
		returned = getSpotify(spotifyId);
		
		$httpBackend.flush();

		expect(returned).toEqual($q(function(resolve) {
			resolve(response)
		}));

	}));	
});











