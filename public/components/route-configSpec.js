describe('root config', function() {
	beforeEach(module('myApp'));

	it('should load the welcome.html template',
	inject(function ($location, $route, $httpBackend) {
		$httpBackend.expectGET('welcome/welcome.html').respond(200);
		$location.path('/');
		$httpBackend.flush();

		expect($route.current.loadedTemplateUrl).toBe('welcome/welcome.html');
		
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should use the welcome controller',
	inject(function ($location, $httpBackend, $route) {
		$httpBackend.whenGET('welcome/welcome.html').respond(200);		
		$location.path('/');
		$httpBackend.flush();
		expect($route.current.controller).toBe('WelcomeCtrl');
	}));
});

describe('search config', function() {
	beforeEach(module('myApp'));

	it('should load the search.html template',
	inject(function ($location, $route, $httpBackend) {
		$httpBackend.expectGET('search/search.html').respond(200);
		$location.path('/search');
		$httpBackend.flush();

		expect($route.current.loadedTemplateUrl).toBe('search/search.html');
		
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should use the search controller',
	inject(function ($location, $httpBackend, $route) {
		$httpBackend.whenGET('search/search.html').respond(200);		
		$location.path('/search');
		$httpBackend.flush();
		expect($route.current.controller).toBe('SearchCtrl');
	}));
});

describe('play config', function() {
	beforeEach(module('myApp'));

	it('should load the mainAndKeyboard.html template',
	inject(function ($location, $route, $httpBackend) {
		$httpBackend.expectGET('mainAndKeyboard/mainAndKeyboard.html').respond(200);
		$location.path('/play');
		$httpBackend.flush();

		expect($route.current.loadedTemplateUrl).toBe('mainAndKeyboard/mainAndKeyboard.html');
		
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should use the search controller',
	inject(function ($location, $httpBackend, $route) {
		$httpBackend.whenGET('mainAndKeyboard/mainAndKeyboard.html').respond(200);		
		$location.path('/play');
		$httpBackend.flush();
		// debugger
		expect($route.current.controller).toBe('MainCtrl');
	}));
});

// describe('otherwise config', function() {
// 	beforeEach(module('myApp'));

// 	it('should load the "otherwise" template',
// 	inject(function ($location, $route, $httpBackend) {
// 		var initLocation = $location.$$absUrl;
// 		$httpBackend.expectGET(initLocation + '#/bogus').respond(200);
// 		$location.path('/bogus');
// 		$httpBackend.flush();
// 		debugger
// 		expect($route.current.locals.$template).toEqual('Page Not Found');
		
// 		$httpBackend.verifyNoOutstandingRequest();
// 		$httpBackend.verifyNoOutstandingExpectation();
// 	}));

// 	it('should not use a controller',
// 	inject(function ($location, $httpBackend, $route) {
// 		$httpBackend.whenGET('mainAndKeyboard/mainAndKeyboard.html').respond(200);		
// 		$location.path('/play');
// 		$httpBackend.flush();
// 		expect($route.current.controller).toBe('MainCtrl');
// 	}));
// });