angular.module("app.controllers",[]).controller('newsCtrl', ['$scope','newsFactory','ENV','$ionicScrollDelegate', function($scope,newsFactory,ENV,$ionicScrollDelegate){
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
		newsFactory.getMoreNews();
	}
	$scope.pageEnd = function(){
	console.log(newsFactory.hasNextPage())
		return newsFactory.hasNextPage();
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
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	})
	$scope.doRefresh = function(){
		threadFactory.getFirstThreadList();
	}
	$scope.loadMore = function(){
		threadFactory.getMoreThread();
	}
	$scope.pageEnd = function(){
	console.log(threadFactory.hasNextPage())
		return threadFactory.hasNextPage();
	}
}])
.controller('newsContCtrl', ['$scope','newsContentFactory','$stateParams', function($scope,newsContentFactory,$stateParams){
	newsContentFactory.getNewsAid($stateParams.aid);
	$scope.$on('newsContent.newsUpdated',function(){
		$scope.content = newsContentFactory.getNewsContent();
	})
}])
.controller('threadContCtrl', ['$scope','threadContentFactory','$stateParams', function($scope,threadContentFactory,$stateParams){
	threadContentFactory.getThreadTid($stateParams.tid);
	$scope.$on('threadContent.threadsUpdated',function(){
		$scope.content = threadContentFactory.getThreadContent();
	})
}])
.controller('loginCtrl', ['$scope','Storage','$state', function($scope,Storage,$state){
	$scope.user={
		username:'',
		password:''
	}
	$scope.login = function(){
		Storage.save("userInfo",$scope.user);
		$state.go("tabs.user");
	}
}])
.controller('userCtrl', ['$scope','Storage', function($scope,Storage){
	if(Storage.get("userInfo")){
		$scope.isLogin = true;
	}else{
		$scope.isLogin = false;
	}
	$scope.username = Storage.get("userInfo").username;
}])
.controller('personalCtrl', ['$scope','$ionicActionSheet','Storage','$state', function($scope,$ionicActionSheet,Storage,$state){
	$scope.logout = function(){
		$ionicActionSheet.show({
				destructiveText: "退出登录",
				titleText: "确定退出当前登录账号么？",
				cancelText: "取消",
				cancel: function() {
				},
				destructiveButtonClicked: function() {
					Storage.remove("userInfo");
					$state.go("tabs.user");
					return true;
				}
		});
	}
}])