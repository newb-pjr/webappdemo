angular.module("app").directive('appPositionClass', [function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/positionClass.html',
		scope: {
			com : '='
		},
		link: function(scope){
			scope.$watch("com",function(newVal){
				if(newVal){
					scope.showPositionList(0);
				}
			})
			scope.showPositionList = function(idx){
				scope.positionList = scope.com.positionClass[idx].positionList;
				scope.isActive = idx;
			}
		}
	};
}]);