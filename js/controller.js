angular.module("app.controller",[]).controller('startCtrl', ['$scope','expressFactory','agencyFactory','customerFactory', function($scope,expressFactory,agencyFactory,customerFactory){
	expressFactory.requestExpress();
	$scope.$on('Order.getExpressUpdated',function(){
		$scope.express = expressFactory.getExpress();
	})

	agencyFactory.requestAgency();
	$scope.$on('User.getAgencyUpdated',function(){
		$scope.agency = agencyFactory.getAgency();
	})

	customerFactory.requestCustomer();
	$scope.$on('User.getCustomerUpdated',function(){
		$scope.customer = customerFactory.getCustomer();
	})
	$scope.list = [{
		id: 0,
		name: '有运单号'
	},
	{
		id: 1,
		name: '无运单号'
	}]
	$scope.selectId = 0;
	$scope.index=function(idx){
		$scope.selectId = idx;
	}
}])
.controller('infoCtrl', ['$scope', function($scope){
	
	// $scope.length = $scope.length || 0;
	// $scope.width = $scope.width || 0;
	// $scope.height = $scope.height || 0;

	// $scope.result = $scope.length*$scope.width*$scope.height/6000;
	// console.log($scope.result);
}])
.controller('packageCtrl', ['$scope','$state','$rootScope','Storage','$state', function($scope,$state,$rootScope,Storage,$state){

	$scope.goBack = function(){
		$state.go('tabs.start');
		// $ionicHistory.goBack(-1)
	}
	// $ionicHistory.nextViewOptions({
	// 	disableBack: true
	// })
	$scope.$on('$ionicView.enter', function () {
  // 显示 tabs
	  $rootScope.hideTabs = '';
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
.controller('addressCtrl', ['$scope','$ionicModal','addressFactory','setDefaultFactory','getCityFactory', function($scope,$ionicModal,addressFactory,setDefaultFactory,getCityFactory){
	$ionicModal.fromTemplateUrl('view/tabs/person/addAddress.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	})
	
	$scope.showModal = function(){
		$scope.modal.show();
		getCityFactory.getCity();
		$scope.$on('User.getCityUpdated',function(){
			$scope.country = getCityFactory.getCountry();
			$scope.area = getCityFactory.getArea();
		})
	}
	$scope.hideModal = function(){
		$scope.modal.hide();
	}
	$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  	})

	addressFactory.getAllList();
	$scope.$on('User.addressUpdated',function(){
		$scope.dataList = addressFactory.getList();
	})
	$scope.setDefault = function(id){
		setDefaultFactory.setDefaultAddress(id);
	}
	$scope.$on('User.setDefaultAddressUpdated',function(){
		if(setDefaultFactory.getChange()){
			addressFactory.getAllList();
		}
	})
}])
.controller('registerCtrl', ['$scope', function($scope){
		$scope.validationInvalidHandler = function(message){
			// console.log(message)
			alert(message)
		}
}])
.controller('loginCtrl', ['$scope','loginFactory','Storage','$state', function($scope,loginFactory,Storage,$state){
	if(Storage.get('user')){
		$state.go('tabs.home');
	}
	$scope.usernameInvalidHandler = function(message){
		alert(message);
	}
	$scope.passwordInvalidHandler = function(message){
		alert(message);
	}
	$scope.user = {
		username:'',
		password:''
	}
	$scope.login = function(){
		loginFactory.login($scope.user.username,$scope.user.password);
	}
}])
.controller('personCtrl', ['$scope','Storage', function($scope,Storage){
	$scope.username = Storage.get('user').user_name;
}])