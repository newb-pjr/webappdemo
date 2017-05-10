angular.module("app").controller('positionCtrl', ['$scope','$http', function($scope,$http){
	$http.get("data/positionList.json").success(function(resp){
		$scope.data = resp;
	})
}])