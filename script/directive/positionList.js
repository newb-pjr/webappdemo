angular.module('app').directive('appPosition', [function(){
	return{
		restrict: 'A',
		replace: true,
		scope: {
			data: '='
		},
		templateUrl: 'view/template/positionList.html',
	};
}])
