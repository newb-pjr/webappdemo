angular.module("app.services",[]).factory('Storage', [function(){
	return {
		set: function(key,val){
			return window.localStorage.setItem(key,JSON.stringify(val));
		},
		get: function(key){
			return JSON.parse(window.localStorage.getItem(key));
		},
		remove: function(key){
			return window.localStorage.removeItem(key);
		}
	}
}])
.factory('loginFactory', ['$resource','ENV','Storage','$state','$rootScope', function($resource,ENV,Storage,$state,$rootScope){
	var api = ENV.api;
	var resource = $resource(api+'/login/login',{},{});
	var isLogin = false;

	return {
		login: function(username,password){
			resource.save({
				user_name:username,
				password:password
			},function(resp){
				alert(resp.msg);
				if(resp.state == 1004){
					Storage.set("user",resp.data);
					$state.go("tabs.home");
					// history.go(-1);
					isLogin = true;
					$rootScope.$broadcast('User.loginUpdated');
				}
			})
		},
		isLoginFunc: function(){
			return isLogin;
		}
	}
}])
.factory('addressFactory', ['$resource','ENV','Storage','$rootScope', function($resource,ENV,Storage,$rootScope){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var data;
	var resource = $resource(api+'/user/address_list', {}, {
		qurey: {
			method: 'get',
			params: {
				user_id: '@userID'
			},
			timeout: 20000
		}
	})

	return {
		getAllList: function(){
			resource.qurey({
				user_id:userID
			},function(resp){
				data = resp.data;
				$rootScope.$broadcast('User.addressUpdated');
			})
		},
		getList: function(){
			return data;
		},
		getDefaultAddress: function(){
			for(var i=0; i<data.length; i++){
				if(data[i].is_default==1){
					return data[i];
				}
			}
		}
	}
}])
.factory('setDefaultFactory', ['$resource','ENV','Storage','$rootScope', function($resource,ENV,Storage,$rootScope){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var isChange=false;
	var resource = $resource(api+'/user/set_default_address', {}, {
		qurey: {
			method: 'post',
			params: {
				user_id: '@userID',
				id: '@addressID'
			},
			timeout: 20000
		}
	})

	return {
		setDefaultAddress: function(id){
			resource.qurey({
				user_id: userID,
				id: id
			},function(resp){
				alert(resp.msg)
				if(resp.state==1009){
					isChange = true;
					$rootScope.$broadcast('User.setDefaultAddressUpdated');
				}
			})
		},
		getChange: function(){
			return isChange;
		}
	}
}])
.factory('getCityFactory', ['$resource','ENV','$rootScope', function($resource,ENV,$rootScope){
	var api = ENV.api;
	var data;
	var areaData;
	var resultSec = [];
	var resource = $resource(api+'/user/get_city', {}, {
		qurey: {
			method: 'get',
			isArray: true,
			timeout: 20000
		}
	})

	return {
		getCity: function(){
			resource.qurey(function(resp){
				data = resp;
				$rootScope.$broadcast('User.getCityUpdated');
			})
		},
		getCountry: function(){
			areaData = data;
			return data[0];	
		},
		findArea: function(id){
			resultSec = [];
			if(id){
				angular.forEach(data[1],function(data){
					if(data.parentid == id){
						resultSec.push(data);
					}
				})
			}else{
				resultSec = [];
			}
		},
		outputArea: function(){
			return resultSec;
		}
	}
}])
.factory('expressFactory', ['$resource','ENV','$rootScope', function($resource,ENV,$rootScope){
	var api = ENV.api;
	var data;
	var resource = $resource(api+'/order/kd_com', {}, {
		qurey: {
			method: 'get',
			timeout: 20000
		}
	})

	return {
		requestExpress: function(){
			resource.qurey(function(resp){
				if(resp.state==1001){
					data = resp.data;
					$rootScope.$broadcast('Order.getExpressUpdated');
				}
			})
		},
		getExpress: function(){
			return data;
		}
	}
}])
.factory('agencyFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var data;
	var detail;
	var userID = Storage.get('user').user_id;
	var resource = $resource(api+'/user/agency_list', {}, {
		qurey: {
			method: 'post',
			params: {
				user_id: '@userID'
			},
			timeout: 20000
		}
	})

	return {
		requestAgency: function(){
			resource.qurey({
				user_id:userID
			},function(resp){
				if(resp.state==1001){
					data = resp.data;
					$rootScope.$broadcast('User.getAgencyUpdated');
				}
			})
		},
		getAgency: function(){
			return data;
		},
		getDetail: function(id){
			if(id){
				for(var i=0; i<data.length; i++){
					if(data[i].id == id){
						detail = data[i];
					}
				}
			}else{
				detail = "";
			}
		},
		getAgencyMobile: function(){
			if(detail){
				return detail.mobile;
			}else{
				return detail;
			}
		},
		getAgencyEmail: function(){
			if(detail){
				return detail.email;
			}else{
				return detail;
			}
		}
	}
}])
.factory('customerFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var data;
	var detail;
	var userID = Storage.get('user').user_id;
	var resource = $resource(api+'/user/customer_list', {}, {
		qurey: {
			method: 'post',
			params: {
				user_id: '@userID'
			},
			timeout: 20000
		}
	})

	return {
		requestCustomer: function(){
			resource.qurey({
				user_id:userID
			},function(resp){
				if(resp.state==1001){
					data = resp.data;
					$rootScope.$broadcast('User.getCustomerUpdated');
				}
			})
		},
		getCustomer: function(){
			return data;
		},
		getDetail: function(id){
			if(id){
				for(var i=0; i<data.length; i++){
					if(data[i].id == id){
						detail = data[i];
					}
				}
			}else{
				detail = "";
			}
		},
		getCustomerMobile: function(){
			if(detail){
				return detail.mobile;
			}else{
				return detail;
			}
		},
		getCustomerEmail: function(){
			if(detail){
				return detail.email;
			}else{
				return detail;
			}
		}
	}
}])
.factory('categorysFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var data;
	var resultSec;
	var resultThi;
	var resource = $resource(api+'/order/categorys', {}, {
		qurey: {
			method: 'get',
			timeout: 20000
		}
	})

	return {
		requestCategorys: function(){
			resource.qurey(function(resp){
				if(resp.state==1001){
					data = resp.data;
					$rootScope.$broadcast('Order.getCategorysUpdated');
				}
			})
		},
		getFirstCategorys: function(){
			return data;
		},
		findSecondCategorys: function(id){
			if(id){
				for(var i=0; i<data.length; i++){
					if(data[i].cat_id==id){
						return resultSec = data[i]._child;
					}
				}
			}else{
				return resultSec = "";
			}
		},
		findThirdCategorys: function(id){
			if(id){
				for(var i=0; i<resultSec.length; i++){
					if(resultSec[i].cat_id==id){
						return resultThi = resultSec[i]._child;
					}
				}
			}else{
				return resultThi = "";
			}
		},
		outputSecondCategorys: function(){
			return resultSec;
		},
		outputThirdCategorys: function(){
			return resultThi;
		}
	}
}])
.factory('saveAddressFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var city = "undefined";
	var district = "undefined";
	var status = false;
	var resource = $resource(api+"/user/save_address", {}, {
		qurey:{
			method: "post",
			timeout: 20000
		}
	})

	return {
		saveAddress: function(addressObj){
			resource.qurey({
				user_id:userID,
				id:addressObj.id,
				consignee:addressObj.consignee,
				mobile:addressObj.phone,
				country:addressObj.getCountry.id,
				province:addressObj.getArea.id,
				city:city,
				district:district,
				address:addressObj.detail
			},function(resp){
				alert(resp.msg)
				if(resp.state == 1100){
					status = true;
				}
				$rootScope.$broadcast('User.saveAddressUpdated');
			})
		},
		getStatus: function(){
			return status;
		}
	}
}])
.factory('delAddressFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var isDelete = false;
	var resource = $resource(api+'/user/del_address', {}, {
		qurey: {
			method: "post",
			timeout: 20000
		}
	})

	return {
		deleteAddress: function(id){
			resource.qurey({
				user_id:userID,
				id:id
			},function(resp){
				alert(resp.msg);
				if(resp.state==1009){
					isDelete = true;
					$rootScope.$broadcast('User.deleteAddressUpdated');
				}
			})
		},
		getDelAddress: function(){
			return isDelete;
		}
	}
}])
.factory('tatalFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var data;
	var resource = $resource(api+'/order/total_info', {}, {
		qurey: {
			method: "get",
			params: {
				user_id:"@userID"
			},
			timeout: 20000
		}
	})

	return {
		getTatal: function(){
			resource.qurey({
				user_id:userID
			},function(resp){
				if(resp.state==1001){
					data = resp.data;
				}
				$rootScope.$broadcast('Order.totalInfoUpdated');
			})
		},
		getArrived: function(){
			if(data.Arrive==""){
				data.Arrive = 0;
			}
			return data.Arrive;
		},
		getNoArrived: function(){
			if(data.NoArrive==""){
				data.NoArrive = 0;
			}
			return data.NoArrive;
		},
		getWaitDelivery: function(){
			if(data.WaitReceiving==""){
				data.WaitReceiving = 0;
			}
			return data.WaitReceiving;
		}
	}
}])
.factory('recordBillFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var data;
	var resource = $resource(api+'/order/query_bill_code', {}, {
		qurey: {
			method: "get",
			params: {
				user_id:"@userID"
			},
			timeout: 20000
		}
	})

	return {
		requestRecord: function(){
			resource.qurey({
				user_id:userID
			},function(resp){
				if(resp.state==1001){
					data = resp.data;
				}
				$rootScope.$broadcast('Order.recordBillUpdated');
			})
		},
		getRecord: function(){
			return data;
		}
	}
}])
.factory('saveOrderFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var result;
	var data;
	var resource = $resource(api+'/order/save_goods', {}, {
		qurey: {
			method: "post",
			timeout: 20000
		}
	})

	return {
		submitOrderInfo: function(dataObj){
			data = "";
			result = false;
			data += 'kdBillcode='+encodeURIComponent(dataObj.kdBillcode);
			data += '&kdCom='+encodeURIComponent(dataObj.kdCom);
			data += '&user_id='+encodeURIComponent(userID);
			data += '&intro='+encodeURIComponent(dataObj.intro);
			data += '&is_has='+encodeURIComponent(dataObj.is_has);
			data += '&goods_type='+encodeURIComponent(dataObj.goods_type);
			data += '&ShopBasic[0][title]='+encodeURIComponent(dataObj.ShopBasic.title);
			data += '&ShopBasic[0][cate_one]='+encodeURIComponent(dataObj.ShopBasic.cate_one);
			data += '&ShopBasic[0][cate_two]='+encodeURIComponent(dataObj.ShopBasic.cate_two);
			data += '&ShopBasic[0][cate_three]='+encodeURIComponent(dataObj.ShopBasic.cate_three);
			data += '&ShopBasic[0][brank]='+encodeURIComponent(dataObj.ShopBasic.brank);
			data += '&ShopBasic[0][nums]='+encodeURIComponent(dataObj.ShopBasic.nums);
			data += '&ShopBasic[0][unit]='+encodeURIComponent(dataObj.ShopBasic.unit);
			data += '&ShopBasic[0][price]='+encodeURIComponent(dataObj.ShopBasic.price);
			data += '&ShopBasic[0][money]='+encodeURIComponent(dataObj.ShopBasic.money);
			resource.qurey(data,function(resp){
				alert(resp.msg);
				if(resp.state==1009){
					result = true;
				}
				$rootScope.$broadcast('Order.saveOrderUpdated');
			})
		},
		getSaveResult: function(){
			return result;
		}
	}
}])
.factory('carriageFactory',  ['$resource','ENV','$rootScope', function($resource,ENV,$rootScope){
	var api = ENV.api;
	var data;
	var resource = $resource(api+'/order/query_good', {}, {
		qurey: {
			method: "get",
			timeout: 20000
		}
	})

	return {
		requestCarriage: function(){
			resource.qurey(function(resp){
				if(resp.state==1001){
					data = resp.data;
				}
				$rootScope.$broadcast('Order.carriageUpdated');
			})
		},
		getCarriage: function(){
			return data;
		}
	}
}])
.factory('deleteCargoFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var result = false;
	var resource = $resource(api+'/order/delete_jy_goods', {}, {
		qurey: {
			method: "post",
			timeout: 20000
		}
	})

	return {
		delCargo: function(id){
			result = false;
			resource.qurey({
				user_id:userID,
				id:id
			},function(resp){
				alert(resp.msg);
				if(resp.state==1015){
					result = true;
				}
				$rootScope.$broadcast('Order.delCargoUpdated');
			})
		},
		getDelResult: function(){
			return result;
		}
	}
}])
.factory('delAllCargoFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var result = false;
	var resource = $resource(api+'/order/delete_jy', {}, {
		qurey: {
			method: "post",
			timeout: 20000
		}
	})

	return {
		delAllCargo: function(id){
			result = false;
			resource.qurey({
				user_id:userID,
				id:id
			},function(resp){
				alert(resp.msg);
				if(resp.state==1015){
					result = true;
				}
				$rootScope.$broadcast('Order.delAllCargoUpdated');
			})
		},
		getDelResult: function(){
			return result;
		}
	}
}])
.factory('warehouseListFactory', ['$resource','ENV','$rootScope', function($resource,ENV,$rootScope){
	var api = ENV.api;
	var data;
	var resource = $resource(api+'/order/house', {}, {
		qurey: {
			method: "get",
			timeout: 20000
		}
	})

	return {
		requestWarehouseList: function(){
			resource.qurey(function(resp){
				if(resp.state==1001){
					data = resp.data;
				}
				$rootScope.$broadcast('Order.warehouseListUpdated');
			})
		},
		getList: function(){
			return data;
		},
		firstWarehouseName: function(){
			return data[0].HouseName;
		},
		firstWarehouse: function(){
			return data[0];
		},
		getWarehouseDet: function(id){
			for(var i=0; i<data.length; i++){
				if(data[i].ID == id){
					return data[i];
				}
			}
		}
	}
}])
.factory('orderFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var page = 1;
	var state = 0;
	var data;
	var resource = $resource(api+'/order/get_order_list', {}, {
		qurey: {
			method: "get",
			params: {
				user_id:"@userID",
				page:"@page",
				state:"@state"
			},
			timeout: 20000
		}
	})

	return {
		requestOrderList: function(){
			resource.qurey({
				user_id:userID,
				page:page,
				state:state
			},function(resp){
				if(resp.state==1001){
					console.log(resp.data.data);
					data = resp.data.data;
					$rootScope.$broadcast('Order.OrderListUpdated');
				}
			})
		},
		getOrderList: function(){
			return data;
		}
	}
}])
.factory('goodListFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var data;
	var resource = $resource(api+'/order/good_list', {}, {
		qurey: {
			method: "get",
			params: {
				user_id:"@userID"
			},
			timeout: 20000
		}
	})

	return {
		requestGoodList: function(){
			resource.qurey({
				user_id:userID
			},function(resp){
				if(resp.state==1001){
					data = resp.data;
					$rootScope.$broadcast('Order.GoodListUpdated');
				}
			})
		},
		getGoodList: function(){
			return data;
		}
	}
}])
.factory('delGoodFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var data;
	var result;
	var resource = $resource(api+'/order/del_goods', {}, {
		qurey: {
			method: "post",
			timeout: 20000
		}
	})

	return {
		delGood: function(id){
			result = false;
			resource.qurey({
				id:id,
				user_id:userID
			},function(resp){
				alert(resp.msg);
				if(resp.state==1015){
					result = true;
				}
				$rootScope.$broadcast('Order.delGoodUpdated');
			})
		},
		getDelResult: function(){
			return result;
		}
	}
}])
.factory('goodSubmitFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var userID = Storage.get('user').user_id;
	var id;
	var result;
	var resource = $resource(api+'/order/goods_submit', {}, {
		qurey: {
			method: "post",
			timeout: 20000
		}
	})

	return {
		getGoodID: function(dataObj){
			id = "";
			for(var i=0; i<dataObj.length; i++){
				if(!!dataObj[i].checked){
					id = dataObj[i].id;
					this.subGood(id);
					break;
				}
			}
			if(!id){
				alert("请勾选一项来打包");
			}
		},
		subGood: function(id){
			result = false;
			resource.qurey({
				id:id,
				user_id:userID
			},function(resp){
				alert(resp.msg);
				if(resp.state==1009){
					result = true;
					$rootScope.$broadcast('Order.subGoodUpdated');
				}
			})
		},
		getSubmitResult: function(){
			return result;
		}
	}
}])