angular.module("app.controllers",[]).controller('newsCtrl', ['$scope','newsFactory','ENV','$timeout', function($scope,newsFactory,ENV,$timeout){
	newsFactory.getTopTopics();
	$scope.$on("PortalList.portalsUpdated",function(){
		
			$scope.data = newsFactory.getNews();
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
		
	});
	$scope.ENV = ENV;
	$scope.doRefresh = function(){
		newsFactory.getTopTopics();
	}
	$scope.loadMore = function(){
			console.log(123)
		newsFactory.getMoreNews();
	}
		$scope.pageEnd = function(){
	console.log(newsFactory.getNextPage())
		return newsFactory.getNextPage();
	}
	// $scope.pageStop = $scope.pageEnd();
	// console.log($scope.pageStop)
}])