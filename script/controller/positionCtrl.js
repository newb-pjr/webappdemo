angular.module("app").controller('positionCtrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){
	var page = 2;
	$http.get("data/positionList.json").success(function(resp){
		$scope.data = resp;
	})

	$scope.doRefresh = function(){
		page = 2;
		$scope.nextPage = true;
		$http.get("data/positionList1.json").success(function(resp){
		console.log(page)
			$scope.data = resp;
		}) 
		.finally(function() {
       // 停止广播ion-refresher
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	}

	$scope.nextPage = true;
	$scope.load_more = function(){
		var loadMore = $timeout(function(){
			page--;
			$http.get("data/positionList.json").success(function(resp){
				for(var i=0; i<resp.length; i++){
					$scope.data.push(resp[i]);
					$scope.$broadcast("scroll.infiniteScrollComplete");
				}
			})
			if(page == 1){
				$scope.nextPage = false;
			}
			console.log(page);
		},2000);
	}
	// $scope.$on('$stateChangeSuccess', function () {
	//     $scope.load_more();
	// });
}])