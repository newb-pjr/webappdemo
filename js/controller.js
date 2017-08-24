angular.module("app.controller",[]).controller('startCtrl', ['$scope','expressFactory','agencyFactory','customerFactory','categorysFactory','Storage', function($scope,expressFactory,agencyFactory,customerFactory,categorysFactory,Storage){
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

	categorysFactory.requestCategorys();
	$scope.$on('Order.getCategorysUpdated',function(){
		$scope.categorysFir = categorysFactory.getFirstCategorys();
	})
	$scope.findSecClass = function(id){
		categorysFactory.findSecondCategorys(id);
		$scope.categorysSec = categorysFactory.outputSecondCategorys();
	}
	$scope.findThiClass = function(id){
		categorysFactory.findThirdCategorys(id);
		$scope.categorysThi = categorysFactory.outputThirdCategorys();
	}


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

	$scope.$watch('hasOrder.ShopBasic.price',function(newVal){
		$scope.hasOrder.ShopBasic.money = $scope.hasOrder.ShopBasic.price*$scope.hasOrder.ShopBasic.nums || 0;
		
	})
	$scope.$watch('hasOrder.ShopBasic.nums',function(newVal){
		$scope.hasOrder.ShopBasic.money = $scope.hasOrder.ShopBasic.price*$scope.hasOrder.ShopBasic.nums || 0;
	})
	$scope.hasOrder = {
		kdBillcode:"",
		kdCom:"",
		ShopBasic:[{
			title:"",
			selectFir:"",
			selectSec:"",
			selectThi:"",
			brank:"",
			nums:"",
			unit:"",
			price:"",
			money:""
		}],
		intro:""
	}
	$scope.addOrder = function(dataObj){
		console.log(dataObj)
		Storage.set("order",dataObj)
	}
}])
.controller('infoCtrl', ['$scope', function($scope){
	
	// $scope.length = $scope.length || 0;
	// $scope.width = $scope.width || 0;
	// $scope.height = $scope.height || 0;

	// $scope.result = $scope.length*$scope.width*$scope.height/6000;
	// console.log($scope.result);
}])
.controller('packageCtrl', ['$scope','Storage','$state','$rootScope','recordBillFactory', function($scope,Storage,$state,$rootScope,recordBillFactory){
	recordBillFactory.requestRecord();
	$scope.$on('Order.recordBillUpdated',function(){
		$scope.record = recordBillFactory.getRecord();
		for(var i=0; i<$scope.record.length; i++){
			$scope.record[i].checked = false;
		}
	})
	
	// $scope.selectAll = function(state){
	// 	if(state){
	// 		for(var i=0; i<$rootScope.record.length; i++){
	// 			$rootScope.record[i].checked = true;
	// 		}
	// 	}else{
	// 		for(var i=0; i<$rootScope.record.length; i++){
	// 			$rootScope.record[i].checked = false;
	// 		}
	// 	}
	// }
	// $scope.selected = function(state){
	// 	if(state){
	// 		for(var i=0; i<$scope.record.length; i++){
	// 			if($scope.record[i].checked){
	// 				$scope.selectedAll = true;
	// 			}else{
	// 				$scope.selectedAll = false;
	// 				return false;
	// 			}
	// 		}
	// 	}else{
	// 		$scope.selectedAll = false;
	// 	}
	// }

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
.controller('addressCtrl', ['$scope','$ionicModal','addressFactory','setDefaultFactory','getCityFactory','saveAddressFactory','delAddressFactory', function($scope,$ionicModal,addressFactory,setDefaultFactory,getCityFactory,saveAddressFactory,delAddressFactory){
	$ionicModal.fromTemplateUrl('view/tabs/person/addAddress.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	})
	
	$scope.showModal = function(addressObj){
		if(addressObj){
			$scope.address = {
				id:addressObj.address_id,
				consignee:addressObj.consignee,
				phone:addressObj.mobile,
				detail:addressObj.address,
			}
		}else{
			$scope.address = {
				id:"",
				consignee:"",
				phone:"",
				detail:""
			}
		}
		$scope.modal.show();
		getCityFactory.getCity();
		$scope.$on('User.getCityUpdated',function(){
			$scope.country = getCityFactory.getCountry();
			// $scope.area = getCityFactory.getArea();
		})
		$scope.selectCountry = function(id){
			getCityFactory.findArea(id);
			$scope.area = getCityFactory.outputArea();
		}
	}
	$scope.hideModal = function(){
		$scope.area = "";
		$scope.modal.hide();
	}

	$scope.address = {
		id:"",
		consignee:"",
		phone:"",
		getCountry:"",
		getArea:"",
		detail:"",
		default:""
	}

	$scope.save = function(){
		saveAddressFactory.saveAddress($scope.address);
	}
	$scope.$on('User.saveAddressUpdated',function(){
		if(saveAddressFactory.getStatus()){
			addressFactory.getAllList();
			$scope.modal.hide();
		}
	})
	
	$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  	})

	$scope.consigneeInvalidHandler = function(message){
		alert(message);
	}
	$scope.phoneInvalidHandler = function(message){
		alert(message);
	}
	$scope.countryInvalidHandler = function(message){
		alert(message);
	}
	$scope.areaInvalidHandler = function(message){
		alert(message);
	}
	$scope.detailInvalidHandler = function(message){
		alert(message);
	}

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

	$scope.delAddress = function(id){
		delAddressFactory.deleteAddress(id);
	}
	$scope.$on('User.deleteAddressUpdated',function(){
		if(delAddressFactory.getDelAddress()){
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
.controller('personCtrl', ['$scope','Storage','tatalFactory', function($scope,Storage,tatalFactory){
	$scope.username = Storage.get('user').user_name;

	tatalFactory.getTatal();
	$scope.$on('Order.totalInfoUpdated',function(){
		$scope.arrived = tatalFactory.getArrived();
		$scope.noArrived = tatalFactory.getNoArrived();
		$scope.delivery = tatalFactory.getWaitDelivery();
	})
}])