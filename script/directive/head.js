angular.module('app').directive('appHead',['$cookieStore',function($cookieStore){
	return{
		restrict: 'A',
		replace: true,
		templateUrl: 'view/template/head.html',
		link: function(scope){
			scope.name = $cookieStore.get('name') || '';
		}
	}
}]);
