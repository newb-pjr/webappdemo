angular.module("app").directive('appHead', ['$cookieStore',function($cookieStore){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/head.html',
		link: function(scope){
			scope.name = $cookieStore.get("name") || "";
		}
	};
}]);