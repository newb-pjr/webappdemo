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
			}
		},
		timeout: 20000
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
			isArray: true
		},
		timeout: 20000
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
		},
		timeout: 20000
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
	var userID = Storage.get('user').user_id;
	var resource = $resource(api+'/user/agency_list', {}, {
		qurey: {
			method: 'post',
			params: {
				user_id: '@userID'
			}
		},
		timeout: 20000
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
		}
	}
}])
.factory('customerFactory', ['$resource','ENV','$rootScope','Storage', function($resource,ENV,$rootScope,Storage){
	var api = ENV.api;
	var data;
	var userID = Storage.get('user').user_id;
	var resource = $resource(api+'/user/customer_list', {}, {
		qurey: {
			method: 'post',
			params: {
				user_id: '@userID'
			}
		},
		timeout: 20000
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
		},
		timeout: 20000
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