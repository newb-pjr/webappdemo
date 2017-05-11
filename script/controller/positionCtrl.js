angular.module("app").controller('positionCtrl', ['$scope','$http', function($scope,$http){
	$http.get("data/positionList.json").success(function(resp){
		$scope.data = resp;
	})

	$scope.doRefresh = function(){
		$http.get("data/positionList1.json").success(function(resp){
		console.log(resp)
			$scope.data = resp;

		}) 
		.finally(function() {
       // 停止广播ion-refresher
	       $scope.$broadcast('scroll.refreshComplete');
	     });
		
	}
}])