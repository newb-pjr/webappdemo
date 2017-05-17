angular.module("app").directive('appHeadBar', [function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/headBar.html',
		scope: {
			text: '@'
		}
	};
}]);