myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'mainAndKeyboard.html',
			controller: 'MainCtrl'
		})
		.when('/search', {
			templateUrl: 'search.html',
			controller: 'SearchCtrl'
		})
		.otherwise({
			template: 'Page Not Found'
		});
}]); // end config