myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'welcome.html',
			controller: 'WelcomeCtrl'
		})
		.when('/search', {
			templateUrl: 'search.html',
			controller: 'SearchCtrl'
		})
		.when('/play', {
			templateUrl: 'mainAndKeyboard.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			template: 'Page Not Found'
		});
}]); // end config