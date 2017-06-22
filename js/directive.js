angular.module("app.directive",[]).directive('tabsHide', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		link: function(scope) {
			$rootScope.tabsHide = 'tabs-item-hide';
			scope.$on('$destroy',function(){
				$rootScope.tabsHide = '';
			})
		}
	};
}]);