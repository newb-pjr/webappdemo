angular.module('app').controller('registerCtrl',['$http','$scope','$interval',function($http,$scope,$interval){
	$scope.submit = function(){
		console.log($scope.user)
	}
	var count = 60
	$scope.send = function(){
		$http.get('data/code.json').then(function(resp){
			if(resp.data.state == 1){
				$scope.time = '60s';
				count = 60;
				var interval = $interval(function(){
					count--;
					if(count<=0){
						$interval.cancel(interval);
						$scope.time = '';
					}else{
						$scope.time = count + 's';
					}
				},1000)
			}
		})
	}
}]);
