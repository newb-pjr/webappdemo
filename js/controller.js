angular.module("app.controller",[]).controller('startCtrl', ['$scope','$ionicTabsDelegate', function($scope,$ionicTabsDelegate){

}])
.controller('infoCtrl', ['$scope', function($scope){
	
	// $scope.length = $scope.length || 0;
	// $scope.width = $scope.width || 0;
	// $scope.height = $scope.height || 0;

	// $scope.result = $scope.length*$scope.width*$scope.height/6000;
	// console.log($scope.result);
}])
.controller('packageCtrl', ['$scope', function($scope){
	 $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
}])
.controller('orderCtrl', ['$scope', function($scope){
	$scope.tab = function(title){
		// console.log(title)
	// 	switch(title){
	// 		case '所有订单':
	// 			$ionicTabsDelegate.$getByHandle('order-tab').select(0);
	// 			break;
	// 		case '未到达货品':
	// 			$ionicTabsDelegate.$getByHandle('order-tab').select(1);
	// 			break;
	// 		case '已到达货品':
	// 			$ionicTabsDelegate.$getByHandle('order-tab').select(2);
	// 			break;
	// 		case '待收货':
	// 			$ionicTabsDelegate.$getByHandle('order-tab').select(3);
	// 			break;
	// 	}
	}
}])