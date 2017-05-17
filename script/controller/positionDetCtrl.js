angular.module("app").controller('positionDetCtrl', ['$scope','$http','$cookieStore', function($scope,$http,$cookieStore){
	$http.get("data/position.json").success(function(resp){
		$scope.position = resp;
	})
	$http.get("data/company.json").success(function(resp){
		$scope.company = resp;
	})
	if($cookieStore.get('name')){
		$scope.isLogin = true;
	}else{
		$scope.isLogin = false;
	}
}])