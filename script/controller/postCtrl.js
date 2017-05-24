angular.module("app").controller('postCtrl', ['$scope','$http','$ionicTabsDelegate', function($scope,$http,$ionicTabsDelegate){
	$http.get("data/myPost.json").success(function(resp){
		$scope.myPositionList = resp;
	})
	$scope.postFilter = function(title){
		$scope.filterObj = {};
		switch (title) {
			case '全部':
				$ionicTabsDelegate.$getByHandle('post-tab').select(0);
				delete $scope.filterObj['state'];
				break;
			case '邀请面试':
				$ionicTabsDelegate.$getByHandle('post-tab').select(1);
				$scope.filterObj['state'] = '1';
				break;
			case '不合适':
				$ionicTabsDelegate.$getByHandle('post-tab').select(2);
				$scope.filterObj['state'] = '-1';
				break;
			default:
				// statements_def
				break;
		}
	}
}])