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
	$scope.topTabs = [{
		id: 'all',
		name: '所有订单',
		isActive: true
	},{
		id: 'onRoad',
		name: '未到达货品',
		isActive: false
	},{
		id: 'arrive',
		name: '已到达货品',
		isActive: false
	},{
		id: 'takeOver',
		name: '待收货',
		isActive: false
	}]

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
.controller('addressCtrl', ['$scope','$ionicModal', function($scope,$ionicModal){
	$ionicModal.fromTemplateUrl('view/tabs/person/addAddress.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	})
	
	$scope.showModal = function(){
		$scope.modal.show();
	}
	$scope.hideModal = function(){
		$scope.modal.hide();
	}
	$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  	})
}])	