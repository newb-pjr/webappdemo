angular.module("app").controller('registerCtrl', ['$scope','$http','$state','$interval', function($scope,$http,$state,$interval){
	$scope.submit = function(){
		$http.post('data/regist.json',$scope.user).success(function(resp){
			$state.go("login");
		})
	}
	var count = 60;
	$scope.send = function(){
		$http.get("data/code.json").success(function(resp){
			if(resp.state == 1){
				$scope.time = 60+"s";
				count = 60;
				var interval = $interval(function(){
					if(count>1){
						count--;
						$scope.time = count+"s";
					}else{
						$interval.cancel(interval);
						$scope.time = "";
					}
				},1000)
			}
		})
	}
}])