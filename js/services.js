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
			return data[0];	
		},
		getArea: function(){
			return data[1];
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