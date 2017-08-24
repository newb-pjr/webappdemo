angular.module("app",['ionic','app.config','app.controller','app.directive','app.services','app.filter','validation','ngResource']).config(['$ionicConfigProvider','$stateProvider','$urlRouterProvider','$validationProvider','$httpProvider',function($ionicConfigProvider,$stateProvider,$urlRouterProvider,$validationProvider,$httpProvider) {
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
				}
			}
		})
		.state('tabs.pay',{
			url: '/pay',
			views: {
				'tab-start': {
					templateUrl: 'view/tabs/start/pay.html'
				}
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
					templateUrl: 'view/tabs/person.html',
					controller: 'personCtrl'
				}
			}
		})
		.state('tabs.order',{
			url: '/order',
			views: {
				'tab-person': {
					templateUrl: 'view/tabs/person/order.html',
					controller: 'orderCtrl'
				}
			}
		})
		.state('tabs.address',{
			url: '/address',
			views: {
				'tab-person': {
					templateUrl: 'view/tabs/person/address.html',
					controller: 'addressCtrl'
				}
			}
		})
		.state('login',{
			url: '/login',
			templateUrl: 'view/login.html',
			controller: 'loginCtrl'
		})
		.state('register',{
			url: '/register',
			templateUrl: 'view/register.html',
			controller: 'registerCtrl'
		})
	$urlRouterProvider.otherwise('login');

	var expression = {
		phone: /^1[\d]{10}$/,
		password: function(value){
			var str = value + "";
			return str.length>5;
		},
		required: function(value){
			return !!value;
		},
		number: /^\d+$/
	}

	var defaultMsg = {
		phone: {
			success: '',
			error: '请输入11位手机号码'
		},
		password: {
			success: '',
			error: '密码长度至少6位'
		},
		required: {
			success: '',
			error: '不能为空'
		},
		number: {
			success: '',
			error: '只能输入数字'
		}
	}

	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
	// $validationProvider.showErrorMessage = false;
	$validationProvider.setValidMethod('submit-only');

}])