angular.module("app.controller",[]).controller('startCtrl', ['$scope', function($scope){
	$scope.select = function(obj){
		console.log(obj)
	}
}])