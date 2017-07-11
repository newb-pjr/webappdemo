angular.module("app",["ionic","app.services","app.config","app.controllers","app.directive","ngResource"]).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
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
			templateUrl: 'view/tabs.html'
		})
		.state('tabs.home',{
			url: '/home',
			views: {
				'tab-home': {
					templateUrl: 'view/tabs/home.html'
				}
			}
		})
		.state('tabs.news',{
			url: '/news',
			views: {
				'tab-news': {
					templateUrl: 'view/tabs/news.html',
					controller: 'newsCtrl'
				}
			}
		})
		.state('tabs.news-content',{
			url: '/news-content/:aid',
			views: {
				'tab-news': {
					templateUrl: 'view/news/news-content.html',
					controller: 'newsContCtrl'
				}
			}
		})
		.state('tabs.thread',{
			url: '/thread',
			views: {
				'tab-thread': {
					templateUrl: 'view/tabs/thread.html',
					controller: 'threadCtrl'
				}
			}
		})
		.state('tabs.thread-content',{
			url: '/thread-content/:tid',
			views: {
				'tab-thread': {
					templateUrl: 'view/thread/thread-content.html',
					controller: 'threadContCtrl'
				}
			}
		})
		.state('tabs.user',{
			url: '/user',
			views: {
				'tab-user': {
					templateUrl: 'view/tabs/user.html'
				}
			}
		})
		.state('tabs.login',{
			url: '/login',
			views: {
				'tab-user': {
					templateUrl: 'view/user/login.html'
				}
			}
		});
	$urlRouterProvider.otherwise('/tabs/home');
}])