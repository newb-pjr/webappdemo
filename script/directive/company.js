angular.module("app").directive('appCompany', [function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/company.html',
		scope: {
			com: '=',
			comRouter: '@'
		}
	};
}]);