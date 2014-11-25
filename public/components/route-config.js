myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'welcome/welcome.html',
			controller: 'WelcomeCtrl'
		})
		.when('/search', {
			templateUrl: 'search/search.html',
			controller: 'SearchCtrl'
		})
		.when('/play', {
			templateUrl: 'mainAndKeyboard/mainAndKeyboard.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			template: 'Page Not Found'
		});
}]); // end config