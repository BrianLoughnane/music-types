myApp.controller('WelcomeCtrl', function($location) {
	var ctrl = this;
	
	ctrl.toSearch = function() {
		$location.path('/search');
	}
});