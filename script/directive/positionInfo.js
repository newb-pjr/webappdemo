angular.module("app").directive('appPositionInfo', [function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/positionInfo.html',
		scope: {
			pos: '=',
			isLogin : '='
		}
	};
}]);