angular.module('app').config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
	$ionicConfigProvider.platform.ios.tabs.style('standard'); 
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

    $ionicConfigProvider.platform.ios.views.transition('ios'); 
    $ionicConfigProvider.platform.android.views.transition('android');
	$stateProvider.state('tabs',{
		url: '/tabs',
		abstract:false,
		templateUrl: 'view/tabs.html'
	})
	.state('tabs.position',{
		url: '/position',
		views: {
			'position': {
				templateUrl: 'view/template/position.html',
				controller: 'positionCtrl'
			}
		},
		cache: false
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
				templateUrl: 'view/template/my.html',
				controller: 'myCtrl'
			}
		},
		cache:false
	})
	.state('tabs.positionDet',{
		url: '/positionDet',
		views: {
			'position': {
				templateUrl: 'view/template/positionDet.html',
				controller: 'positionDetCtrl'
			}
		},
	})
	.state('login',{
		url: '/login',
		templateUrl: 'view/template/login.html',
		controller: 'loginCtrl'
	})
	.state('register',{
		url: '/register',
		templateUrl: 'view/template/register.html',
		controller: 'registerCtrl'
	})
	$urlRouterProvider.otherwise('/tabs/position');
}])