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
	$scope.tabsList = [{
		id: 0,
		name: '教程',
		catid: 1
	},{
		id: 1,
		name: '资讯',
		catid: 2
	},{
		id: 2,
		name: '杂谈',
		catid: 3
	},{
		id: 3,
		name: '互联网',
		catid: 4
	},{
		id: 4,
		name: '财经',
		catid: 5
	},{
		id: 5,
		name: '娱乐',
		catid: 1
	},{
		id: 6,
		name: '体育',
		catid: 1
	},{
		id: 7,
		name: '科技',
		catid: 1
	}]
	$scope.selectId = 0;
	$scope.select = function(selectId,catid){
		$scope.selectId = selectId;
	}
}])