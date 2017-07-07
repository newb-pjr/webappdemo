angular.module("app.directive",[]).directive('hideTabs', ['$rootScope', function($rootScope){
	return {
		restrict: 'EA',
		link: function(scope) {
			$rootScope.hideTabs = 'tabs-item-hide';
			scope.$on("$destroy",function(){
				$rootScope.hideTabs = '';
			})
		}
	};
}]);