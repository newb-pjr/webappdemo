angular.module("app").directive('appHead', [function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/head.html'
	};
}]);