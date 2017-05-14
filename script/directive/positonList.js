angular.module("app").directive('appPosition', [function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/positionList.html'
	};
}]);