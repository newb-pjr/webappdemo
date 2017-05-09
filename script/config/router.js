angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('tabs',{
		url: '/tabs',
		templateUrl: 'view/tabs.html'
	})
	.state('tabs.position',{
		url: '/position',
		views: {
			'position': {
				templateUrl: 'view/position.html'
			}
		}
	})	
}])