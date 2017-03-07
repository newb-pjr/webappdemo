angular.module('app').directive('appSheet',[function(){
	return{
		restrict: 'A',
		replace: true,
		scope: {
			list: '=',
			visible: '=',
			selectClick: '&'
		},
		templateUrl: 'view/template/sheet.html',
		link: function(scope){
			scope.select = function(sel){
				scope.selectClick(sel);
			}
		}
	}
}]);
