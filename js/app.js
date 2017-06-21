angular.module("app",['ionic','app.controller']).config(['$ionicConfigProvider','$stateProvider','$urlRouterProvider',function($ionicConfigProvider,$stateProvider,$urlRouterProvider) {
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('left');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

	$stateProvider
		.state('tabs',{
			url: '/tabs',
			templateUrl: 'view/tabs.html',
		})
		.state('tabs.home',{
			url: '/home',
			views: {
				'tab-home': {
					templateUrl: 'view/tabs/home.html'
				}
			}
		})
		.state('tabs.start',{
			url: '/start',
			views: {
				'tab-start': {
					templateUrl: 'view/tabs/start.html',
					controller: 'startCtrl'
				}
			},
		})
		.state('tabs.check',{
			url: '/check',
			views: {
				'tab-start': {
					templateUrl: 'view/tabs/start/checked.html',
				}
			}
		})
		.state('tabs.package',{
			url: '/package',
			views: {
				'tab-start': {
					templateUrl: 'view/tabs/start/package.html',
					controller: 'packageCtrl'
				},
				cache: false
			}
		})
		.state('tabs.info',{
			url: '/info',
			views: {
				'tab-info': {
					templateUrl: 'view/tabs/info.html',
					controller: 'infoCtrl'
				}
			}
		})
		.state('tabs.person',{
			url: '/person',
			views: {
				'tab-person': {
					templateUrl: 'view/tabs/person.html'
				}
			}
		})
	$urlRouterProvider.otherwise('tabs/home')
}])