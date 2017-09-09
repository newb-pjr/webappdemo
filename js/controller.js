angular.module("app.controller",[]).controller('startCtrl', ['$scope','expressFactory','agencyFactory','customerFactory','categorysFactory','Storage','saveOrderFactory','warehouseListFactory','$ionicActionSheet', function($scope,expressFactory,agencyFactory,customerFactory,categorysFactory,Storage,saveOrderFactory,warehouseListFactory,$ionicActionSheet){
	expressFactory.requestExpress();
	$scope.$on('Order.getExpressUpdated',function(){
		$scope.express = expressFactory.getExpress();
		$scope.hasOrder.kdCom = $scope.express[0].kd_com;
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
	$scope.$watch('noOrder.ShopBasic.price',function(newVal){
		$scope.noOrder.ShopBasic.money = $scope.noOrder.ShopBasic.price*$scope.noOrder.ShopBasic.nums || 0;
		
	})
	$scope.$watch('noOrder.ShopBasic.nums',function(newVal){
		$scope.noOrder.ShopBasic.money = $scope.noOrder.ShopBasic.price*$scope.noOrder.ShopBasic.nums || 0;
	})

	$scope.hasOrder = {
		kdBillcode:"",
		kdCom:"",
		ShopBasic:{
			title:"",
			cate_one:"",
			cate_two:"",
			cate_three:"",
			brank:"",
			nums:"",
			unit:"",
			price:"",
			money:""
		},
		intro:""
	}
	$scope.noOrder = {
		agence_name:"",
		agence_email:"",
		agence_mobile:"",
		agence_order_no:"",
		customer_name:"",
		customer_email:"",
		customer_mobile:"",
		ShopBasic:{
			title:"",
			cate_one:"",
			cate_two:"",
			cate_three:"",
			brank:"",
			nums:"",
			unit:"",
			price:"",
			money:""
		},
		intro:""
	}
	$scope.addOrder = function(id,dataObj,c1,c2,c3){
		var order = Storage.get("order") || [];
		if(id==0){
			if(!!order.length){
				if(!!order[0].kdBillcode){
					if(order[0].kdBillcode != dataObj.kdBillcode){
						order = [];
					}
				}else{
					order = [];
				}
			}
		}
		if(id==1){
			if(!!order.length){
				if(!!order[0].agence_order_no){
					if(order[0].agence_order_no != dataObj.agence_order_no){
						order = [];
					}
				}else{
					order = [];
				}
			}
			dataObj.agence_name = dataObj.agence_name.name;
			dataObj.customer_name = dataObj.customer_name.name;
		}
		dataObj.ShopBasic.cate_one = c1;
		dataObj.ShopBasic.cate_two = c2;
		dataObj.ShopBasic.cate_three = c3;
		order.push(dataObj);
		Storage.set("order",order)
	}

	$scope.saveCargo = function(){
		saveOrderFactory.submitOrderInfo();
	}

	var sheetButtons = [];
	var warehouseList;
	warehouseListFactory.requestWarehouseList();
	$scope.$on('Order.warehouseListUpdated',function(){
		$scope.warehouse = warehouseListFactory.firstWarehouseName();
		$scope.warehouseDetail = warehouseListFactory.firstWarehouse();
		warehouseList = warehouseListFactory.getList();
		for(var i=0; i<warehouseList.length; i++){
			sheetButtons.push({text:warehouseList[i].HouseName})
		}
	})

	$scope.warehouseSheet = function(){
		$ionicActionSheet.show({
			buttons: sheetButtons,
			cancelText: '取消',
			buttonClicked: function(index){
				$scope.warehouseDetail = warehouseListFactory.getWarehouseDet(warehouseList[index].ID);
				$scope.warehouse = warehouseList[index].HouseName;
				return true;
			}
		})
	}

	$scope.getAgenceDet = function(id){
		agencyFactory.getDetail(id);
		$scope.noOrder.agence_mobile = agencyFactory.getAgencyMobile();
		$scope.noOrder.agence_email = agencyFactory.getAgencyEmail();
	}

	$scope.getCustomerDet = function(id){
		customerFactory.getDetail(id);
		$scope.noOrder.customer_mobile = customerFactory.getCustomerMobile();
		$scope.noOrder.customer_email = customerFactory.getCustomerEmail();
	}
	// $scope.$on('Order.saveOrderUpdated',function(){
	// 	saveOrderFactory.
	// })
}])
.controller('infoCtrl', ['$scope', function($scope){
	
	// $scope.length = $scope.length || 0;
	// $scope.width = $scope.width || 0;
	// $scope.height = $scope.height || 0;

	// $scope.result = $scope.length*$scope.width*$scope.height/6000;
	// console.log($scope.result);
}])
.controller('packageCtrl', ['$scope','Storage','$state','$rootScope','recordBillFactory','deleteCargoFactory','delAllCargoFactory', function($scope,Storage,$state,$rootScope,recordBillFactory,deleteCargoFactory,delAllCargoFactory){
	recordBillFactory.requestRecord();
	$scope.$on('Order.recordBillUpdated',function(){
		$scope.record = recordBillFactory.getRecord();
		for(var i=0; i<$scope.record.length; i++){
			$scope.record[i].checked = false;
		}
	})
	
	$scope.delCargo = function(id){
		deleteCargoFactory.delCargo(id);
	}
	$scope.$on('Order.delCargoUpdated',function(){
		if(deleteCargoFactory.getDelResult()){
			recordBillFactory.requestRecord();
		}
	})

	$scope.delAll = function(id){
		delAllCargoFactory.delAllCargo(id);
	}
	$scope.$on('Order.delAllCargoUpdated',function(){
		if(delAllCargoFactory.getDelResult()){
			recordBillFactory.requestRecord();
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
.controller('orderCtrl', ['$scope','$state','orderFactory', function($scope,$state,orderFactory){
	$scope.topTabs = [{
		id: 'all',
		name: '所有订单',
		isActive: true
	},{
		id: 'onRoad',
		name: '未发货',
		isActive: false
	},{
		id: 'arrive',
		name: '已发货',
		isActive: false
	},{
		id: 'takeOver',
		name: '已签收',
		isActive: false
	}]

	orderFactory.requestOrderList();
	$scope.$on('Order.OrderListUpdated',function(){
		$scope.orderList = orderFactory.getOrderList();
	})
	
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
.controller('checkCtrl', ['$scope','Storage','goodListFactory', function($scope,Storage,goodListFactory){
	$scope.order = Storage.get("order");
	$scope.delOrder = function(name){
		for(var i=0; i<$scope.order.length; i++){
			if($scope.order[i].ShopBasic.title == name){
				$scope.order.splice(i, 1);
			}
		}
		Storage.set("order",$scope.order);
		$scope.order = Storage.get("order");
	}

	goodListFactory.requestGoodList();
	$scope.$on('Order.GoodListUpdated',function(){
		$scope.goodList = goodListFactory.getGoodList();
	})
}])
.controller('payCtrl', ['$scope','addressFactory','carriageFactory', function($scope,addressFactory,carriageFactory){
	addressFactory.getAllList();
	$scope.$on('User.addressUpdated',function(){
		$scope.defaultAddress = addressFactory.getDefaultAddress();
	})

	carriageFactory.requestCarriage();
	$scope.$on('Order.carriageUpdated',function(){
		$scope.carriage = carriageFactory.getCarriage();
	})
}])