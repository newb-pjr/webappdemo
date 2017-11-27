angular.module('app',['ionic','app.config','app.controller','app.directive','app.services','app.filter','ngMd5','ngResource']).config(['$ionicConfigProvider','$stateProvider','$urlRouterProvider','$httpProvider',function ($ionicConfigProvider,$stateProvider,$urlRouterProvider,$httpProvider) {
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('left');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText(false).icon('ion-ios-arrow-thin-left').text('返回');
	$ionicConfigProvider.platform.android.backButton.previousTitleText(false).icon('ion-android-arrow-back').text('返回');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';


	  // Override $http service's default transformRequest
	  $httpProvider.defaults.transformRequest = [function(data)
	  {
	      /**
	       * The workhorse; converts an object to x-www-form-urlencoded serialization.
	       * @param {Object} obj
	       * @return {String}
	       */
	       var param = function(obj)
	       {
	       	var query = '';
	       	var name, value, fullSubName, subName, subValue, innerObj, i;


	       	for(name in obj)
	       	{
	       		value = obj[name];


	       		if(value instanceof Array)
	       		{
	       			for(i=0; i<value.length; ++i)
	       			{
	       				subValue = value[i];
	       				fullSubName = name + '[' + i + ']';
	       				innerObj = {};
	       				innerObj[fullSubName] = subValue;
	       				query += param(innerObj) + '&';
	       			}
	       		}
	       		else if(value instanceof Object)
	       		{
	       			for(subName in value)
	       			{


	       				subValue = value[subName];
	       				if(subValue != null){
	                          // fullSubName = name + '[' + subName + ']';
	                          //user.userName = hmm & user.userPassword = 111
	                          fullSubName = name + '.' + subName;
	                          // fullSubName =  subName;
	                          innerObj = {};
	                          innerObj[fullSubName] = subValue;
	                          query += param(innerObj) + '&';
	                      }
	                  }
	              }
	              else if(value !== undefined ) //&& value !== null
	              {
	              	query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	              }
	          }


	          return query.length ? query.substr(0, query.length - 1) : query;
	      };


	      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	  }]


	  $httpProvider.defaults.useXDomain = true;
	  // delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$stateProvider.state('tab-home',{
		url: '/tab-home',
		templateUrl: 'view/tab-home.html',
		controller: 'tabHomeCtrl',
		cache: false
	})
	.state('tab-home.home',{
		url: '/home',
		views: {
			'apply': {
				templateUrl: 'view/home/home.html',
				controller: 'homeCtrl'
			}
		}
	})
	.state('tab-home.record',{
		url: '/record',
		views: {
			'record': {
				templateUrl: 'view/home/record.html',
				controller: 'recordCtrl'
			}
		},
		cache: false
	})
	.state('tab-teacher',{
		url: '/tab-teacher',
		templateUrl: 'view/tab-teacher.html',
		controller: 'tabTeacherCtrl'
	})
	.state('tab-teacher.search',{
		url: '/search',
		views: {
			'search': {
				templateUrl: 'view/teacher/search.html',
				controller: 'searchCtrl'
			}
		}
	})
	.state('tab-teacher.record',{
		url: '/record',
		views: {
			'search': {
				templateUrl: 'view/teacher/record.html',
				controller: 'searchRecordCtrl'
			}
		}
	})
	.state('tab-teacher.leave',{
		url: '/leave',
		views: {
			'leave': {
				templateUrl: 'view/teacher/leave.html',
				controller: 'leaveCtrl'
			}
		}
	})
	.state('wx-login',{
		url: '/wx-login',
		templateUrl: 'view/wx-login.html',
		controller: 'wxLoginCtrl'
	})
	.state('login',{
		url: '/login',
		templateUrl: 'view/login.html',
		controller: 'loginCtrl'
	})
	$urlRouterProvider.otherwise('wx-login')
}])
