angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('tabs',{
		url: '/tabs',
		abstract:true,
		templateUrl: 'view/tabs.html'
	})
	.state('tabs.position',{
		url: '/position',
		views: {
			'position': {
				templateUrl: 'view/template/position.html'
			}
		}
	})
	.state('tabs.search',{
		url: '/search',
		views: {
			'search': {
				templateUrl: 'view/template/search.html'
			}
		}
	})
	.state('tabs.my',{
		url: '/my',
		views: {
			'my': {
				templateUrl: 'view/template/my.html'
			}
		}
	})
	$urlRouterProvider.otherwise('/tabs/position');
}])