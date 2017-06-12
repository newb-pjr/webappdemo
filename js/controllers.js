angular.module("app.controllers",[]).controller('newsCtrl', ['$scope','newsFactory','ENV', function($scope,newsFactory,ENV){
	newsFactory.getTopTopics();
	$scope.$on("PortalList.portalsUpdated",function(){
		$scope.data = newsFactory.getNews();
	});
	$scope.ENV = ENV;
	$scope.doRefresh = function(){
		newsFactory.getTopTopics();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.loadMore = function(){
		console.log(123)
		newsFactory.getMoreNews();
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
	// console.log(newsFactory.getNextPage())
	$scope.pageEnd = function(){
		console.log(newsFactory.getNextPage())
		return true;
	}
}])