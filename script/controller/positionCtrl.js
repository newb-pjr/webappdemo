angular.module("app").controller('positionCtrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){
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

	$scope.loadMore = function(){
		var tData = $timeout(function(){
			$http.get("data/positionList.json").success(function(resp){
				console.log(resp)
				$scope.data = resp;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			$timeout.cancel(tData);
			})
		},2000)
	}
}])