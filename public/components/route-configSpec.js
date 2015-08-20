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
		expect($route.current.controller).toBe('WelcomeCtrl as ctrl');
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
		expect($route.current.controller).toBe('SearchCtrl as searchctrl');
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
		expect($route.current.controller).toBe('MainCtrl as mainctrl');
	}));
});
