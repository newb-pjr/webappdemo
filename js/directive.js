angular.module("app.directive",[]).directive('tabsHide', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		link: function(scope) {
			$rootScope.tabsHide = 'tabs-item-hide';
			// scope.$on('$destroy',function(){
			// 	$rootScope.tabsHide = '';
			// })
		}
	};
}])
.directive('tabsShow', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		link: function(scope) {
			$rootScope.tabsHide = '';
			console.log(123)
		}
	};
}])
.directive('topTabs', [function(){
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: 'view/tabs/person/topTabs.html',
		scope: {
			tabList: '='
		},
		link: function(scope){
			scope.selectId = 'all';
			scope.select = function(items){
				scope.selectId = items.id;
			}
		}
	};
}]);