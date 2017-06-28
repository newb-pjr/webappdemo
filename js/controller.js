angular.module("app.controller",[]).controller('startCtrl', ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
	// $ionicNavBarDelegate.showBackButton(false);

}])
.controller('infoCtrl', ['$scope', function($scope){
	
	// $scope.length = $scope.length || 0;
	// $scope.width = $scope.width || 0;
	// $scope.height = $scope.height || 0;

	// $scope.result = $scope.length*$scope.width*$scope.height/6000;
	// console.log($scope.result);
}])
.controller('packageCtrl', ['$scope','$state','$rootScope', function($scope,$state,$rootScope){
	$scope.goBack = function(){
		$state.go('tabs.start');
		// $ionicHistory.goBack(-1)
	}
	// $ionicHistory.nextViewOptions({
	// 	disableBack: true
	// })
	$scope.$on('$ionicView.enter', function () {
  // 显示 tabs
	  $rootScope.tabsHide = '';
	  console.log(233333)
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