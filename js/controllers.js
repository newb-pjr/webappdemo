angular.module("app.controllers",[]).controller('newsCtrl', ['$scope','newsFactory','ENV','$timeout','$ionicScrollDelegate', function($scope,newsFactory,ENV,$timeout,$ionicScrollDelegate){
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
		catid: 20
	},{
		id: 1,
		name: '资讯',
		catid: 1
	},{
		id: 2,
		name: '杂谈',
		catid: 27
	},{
		id: 3,
		name: '互联网',
		catid: 15
	},{
		id: 4,
		name: '财经',
		catid: 20
	},{
		id: 5,
		name: '娱乐',
		catid: 1
	},{
		id: 6,
		name: '体育',
		catid: 27
	},{
		id: 7,
		name: '科技',
		catid: 15
	}]
	$scope.selectId = 0;
	$scope.select = function(itemId,catid){
		$scope.selectId = itemId;
		$ionicScrollDelegate.$getByHandle('tabsScroll').scrollTop();
		newsFactory.setNewsCatid(catid);
	}
}])
.controller('threadCtrl', ['$scope','threadFactory', function($scope,threadFactory){
	threadFactory.getFirstThreadList();
	$scope.$on('threadList.threadsUpdated',function(){
		$scope.data = threadFactory.getThread();
	})
}])