myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'welcome/welcome.html',
			controller: 'WelcomeCtrl as ctrl'
		})
		.when('/search', {
			templateUrl: 'search/search.html',
			controller: 'SearchCtrl as searchctrl'
		})
		.when('/play', {
			templateUrl: 'mainAndKeyboard/mainAndKeyboard.html',
			controller: 'MainCtrl as mainctrl'
		})
		.otherwise({
			template: 'Page Not Found'
		});
}]); // end config