angular.module("app").controller('postCtrl', ['$scope','$http', function($scope,$http){
	$http.get("data/myPost.json").success(function(resp){
		$scope.myPositionList = resp;
	})
	$scope.postFilter = function(title){
		switch (title) {
			case '全部':
				$ionicTabsDelegate.$getByHandle('post-tab').select(0)
				break;
			case '邀请面试':
				$ionicTabsDelegate.$getByHandle('post-tab').select(1)
				break;
			case '不合适':
				$ionicTabsDelegate.$getByHandle('post-tab').select(2)
				break;
			default:
				// statements_def
				break;
		}
		$scope.filterObj['state'] = state;
	}
}])