angular.module('app.services',[]).factory('Storage', [function(){
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
.factory('wxLoginFactory', ['getQueryStringFactory','$resource','md5','ENV','$state','$filter','Storage',function (getQueryStringFactory,$resource,md5,ENV,$state,$filter,Storage) {
	var wxId = getQueryStringFactory.getQueryString('wxID');
	var timeNow = new Date();
	var yeahStr = timeNow.getFullYear();
	var monthStr = timeNow.getMonth() + 1;
	var dayStr = timeNow.getDate();
	var hourStr = timeNow.getHours();
	var minuteStr = timeNow.getMinutes();
	var secondStr = timeNow.getSeconds();
	var time = $filter('date')(timeNow,'yyyy-MM-dd HH:mm:ss');
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var resource = $resource(api+'/UserWeixinLogin.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})
	
	return {
		getTimeString: function(){
			if(monthStr < 10){
				monthStr = '0' + monthStr;
			}
			if(dayStr < 10){
				dayStr = '0' + dayStr;
			}
			if(hourStr < 10){
				hourStr = '0' + hourStr;
			}
			if(minuteStr < 10){
				minuteStr = '0' + minuteStr;
			}
			if(secondStr < 10){
				secondStr = '0' + secondStr;
			}
			return yeahStr.toString() + monthStr.toString() + dayStr + hourStr + minuteStr + secondStr;
		},
		createPassword: function(){
			return md5.createHash(wxId + '_' + '9ol.0p;/' + '_' + this.getTimeString());
		},
		login: function(){
			resource.query({
				jtId: 0,
				yeyId: yeyId,
				areaCode: '',
				wxId: wxId,
				time: time,
				pwd: this.createPassword()
			},function(resp){
				if(!resp.status){
					// weui.alert('您此前的登录信息已注销，请重新登录');
					$state.go('login');
				}else{
					if(resp.children[0].type===1){
						Storage.set('teacherArr',resp);
						$state.go('tab-teacher.leave');
					}
					if(resp.children[0].type===2){
						Storage.set('childrenArr',resp);
						$state.go('tab-home.home');
					}
				}
			})
		}
	};
}])
.factory('loginFactory', ['ENV','$resource','getQueryStringFactory','md5','$rootScope','Storage','$state',function (ENV,$resource,getQueryStringFactory,md5,$rootScope,Storage,$state) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var wxId = getQueryStringFactory.getQueryString('wxID')
	var resource = $resource(api+'/UserLogin.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})
	return {
		login: function(userObj){
			if(userObj.username != "" && userObj.password != ""){
				resource.query({
					jtId: 0,
					yeyId: yeyId,
					areaCode: '',
					uid: userObj.username,
					pwd: md5.createHash(userObj.password),
					wxId: wxId
				},function(resp){
					if(resp.status){
						if(resp.type===1){
							Storage.set('teacher',resp);
							$state.go('tab-teacher.leave');
						}
						if(resp.type===2){
							Storage.set('children',resp);
							$state.go('tab-home.home');
						}
					}else{
						weui.alert(resp.err);
					}
				})
			}else{
				weui.alert('用户名或密码不能为空');
			}
		}
	};
}])
.factory('getQueryStringFactory', [function () {
	var reg; 
	var r;

	return {
		getQueryString: function(name){
			reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			r = window.location.search.substr(1).match(reg); 
			if (r != null){
				return unescape(r[2]);
			}
			return null; 
		}
	};
}])
.factory('dateFactory', [function () {
	var dateCount;
	return {
		getStartDate: function(startDate){
			return Date.parse(startDate.split('-'))
		},
		getEndDate: function(endDate){
			return Date.parse(endDate.split('-'))
		},
		dateNum: function(recordStartDate,recordEndDate){
			dateCount = (recordEndDate - recordStartDate)/(1000*60*60*24)
			if(!!dateCount){
				return dateCount
			}else{
				return 0
			}
		}
	};
}])
.factory('applyFactory', ['$resource','ENV','Storage','$state',function ($resource,ENV,Storage,$state) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jzId;
	var token;
	var resource = $resource(api+'/ParentVacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		applyLeave: function(beginTime,vacationTime){
			if(!!Storage.get('children')){
				jzId = Storage.get('children').jzId;
				token = Storage.get('children').token;
			}
			if(!!Storage.get('childrenArr')){
				jzId = Storage.get('childrenArr').children[0].jzId;
				token = Storage.get('childrenArr').children[0].token;
			}
			resource.query({
				jtId: 0,
				yeyId: yeyId,
				jzId: jzId,
				token: token,
				action: 'apply',
				timeType: 1,
				applyType: 1,
				vacationType: 1,
				reason: '',
				beginTime: beginTime,
				vacationTime: vacationTime
			},function(resp){
				if(resp.status){
					$state.go('tab-home.record')
				}else{
					weui.alert(resp.err)
				}
			})
		}
	};
}])
.factory('homeLeaveFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var jzId;
	var token;
	var action = 'search';
	var validType = 2;
	var beginTime = '';
	var endTime = '';
	var pageSize = 6;
	var page;
	var result;
	var hasPage = true;
	var resource = $resource(api+'/ParentVacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		getHomeLeaveList: function(searchType){
			hasPage= true;
			if(!!Storage.get('children')){
				jzId = Storage.get('children').jzId;
				token = Storage.get('children').token;
			}
			if(!!Storage.get('childrenArr')){
				jzId = Storage.get('childrenArr').children[0].jzId;
				token = Storage.get('childrenArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jzId: jzId,
				token: token,
				action: action,
				searchType: searchType,
				validType: validType,
				beginTime: beginTime,
				endTime: endTime,
				pageSize: pageSize,
				page: 1
			},function(resp){
				if(resp.status){
					result = resp.data;
					$rootScope.$broadcast('Home.HomeLeaveListUpdated');
					if(resp.count > (pageSize*1)){
						page = 2;
					}else{
						hasPage = false;
					}
				}
			})
		},
		getMoreHomeLeaveList: function(searchType){
			hasPage= true;
			if(!!Storage.get('children')){
				jzId = Storage.get('children').jzId;
				token = Storage.get('children').token;
			}
			if(!!Storage.get('childrenArr')){
				jzId = Storage.get('childrenArr').children[0].jzId;
				token = Storage.get('childrenArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jzId: jzId,
				token: token,
				action: action,
				searchType: searchType,
				validType: validType,
				beginTime: beginTime,
				endTime: endTime,
				pageSize: pageSize,
				page: page
			},function(resp){
				if(resp.status){
					result = result.concat(resp.data);
					$rootScope.$broadcast('Home.HomeLeaveListUpdated');
					if(resp.count > (pageSize*page)){
						page++;
					}else{
						hasPage = false;
					}
				}
			})
		},
		hasNextPage: function(){
			return hasPage;
		},
		homeLeaveList: function(){
			return result;
		}
	};
}])
.factory('teacherLeaveFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var jsId;
	var token;
	var action = 'search';
	var validType = 2;
	var classID = '';
	var userType =1;
	var name = '';
	var beginTime = '';
	var endTime = '';
	var pageSize = 6;
	var page;
	var result;
	var hasPage = true;
	var resource = $resource(api+'/Vacation.ashx',{},{
		query: {
			method: 'get',
			params: {
				jtId: '@jtId',
				yeyId: '@yeyId',
				jsId: '@jsId',
				token: '@token',
				action: '@action',
				validType: '@validType',
				classID: '@classID',
				userType: '@userType',
				name: '@name',
				beginTime: '@beginTime',
				endTime: '@endTime',
				pageSize: '@pageSize',
				page: '@page'
			},
			timeout: 20000
		}
	})

	return {
		getTeacherLeaveList: function(searchType){
			hasPage = true;
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action,
				searchType: searchType,
				validType: validType,
				classID: classID,
				userType: userType,
				name: name,
				beginTime: beginTime,
				endTime: endTime,
				pageSize: pageSize,
				page: 1
			},function(resp){
				if(resp.status){
					result = resp.data;
					$rootScope.$broadcast('Teacher.TeacherLeaveListUpdated');
					if(resp.count > (pageSize*1)){
						page = 2;
					}else{
						hasPage = false;
					}
				}
			})
		},
		getMoreTeacherLeaveList: function(searchType){
			hasPage = true;
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action,
				searchType: searchType,
				validType: validType,
				classID: classID,
				userType: userType,
				name: name,
				beginTime: beginTime,
				endTime: endTime,
				pageSize: pageSize,
				page: page
			},function(resp){
				if(resp.status){
					result = result.concat(resp.data);
					$rootScope.$broadcast('Teacher.TeacherLeaveListUpdated');
					if(resp.count > (pageSize*page)){
						page++;
					}else{
						hasPage = false;
					}
				}
			})
		},
		teacherLeaveList: function(){
			return result;
		},
		hasNextPage: function(){
			return hasPage;
		}
	};
}])
.factory('cancelLeaveFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var jzId;
	var token;
	var action = 'apply';
	var timeType = 1;
	var applyType = 2;
	var vacationType = 3;
	var reason = '';
	var vacationTime = 1;
	var result;
	var resource = $resource(api+'/ParentVacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		applyLeave: function(id,beginTime){
			if(!!Storage.get('children')){
				jzId = Storage.get('children').jzId;
				token = Storage.get('children').token;
			}
			if(!!Storage.get('childrenArr')){
				jzId = Storage.get('childrenArr').children[0].jzId;
				token = Storage.get('childrenArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jzId: jzId,
				token: token,
				action: action,
				parentID: id,
				timeType: timeType,
				applyType: applyType,
				vacationType: vacationType,
				reason: reason,
				beginTime: beginTime,
				vacationTime: vacationTime
			},function(resp){
				if(resp.status){
					weui.toast('操作成功', 3000);
					$rootScope.$broadcast('Home.HomeCancelLeaveUpdated')
				}else{
					weui.alert(resp.err)
				}
			})
		}
	};
}])
.factory('logoutFactory', ['$resource','ENV','Storage','$state','$rootScope',function ($resource,ENV,Storage,$state,$rootScope) {
	var api = ENV.api;
	var userId;
	var token;
	var resource = $resource(api+'/UserLogout.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		logout: function(userType){
			if(userType===1){
				if(!!Storage.get('teacher')){
					userId = Storage.get('teacher').yhId;
					token = Storage.get('teacher').token;
				}
				if(!!Storage.get('teacherArr')){
					userId = Storage.get('teacherArr').children[0].yhId;
					token = Storage.get('teacherArr').children[0].token;
				}
			}
			if(userType===2){
				if(!!Storage.get('children')){
					userId = Storage.get('children').jzId;
					token = Storage.get('children').token;
				}
				if(!!Storage.get('childrenArr')){
					userId = Storage.get('childrenArr').children[0].jzId;
					token = Storage.get('childrenArr').children[0].token;
				}
			}
			resource.query({
				userType: userType,
				userId: userId,
				token: token
			},function(resp){
				if(resp.status){
					$rootScope.$broadcast('User.UserLogoutUpdated');
					window.location.href = 'http://www.krbb.cn/WebAppHandler/GetOpenID.ashx?yeyId=54&backUrl=http://www.krbb.cn/leave/#/login'
					// $state.go('login');
				}else{
					weui.alert(resp.err);
					window.location.href = 'http://www.krbb.cn/WebAppHandler/GetOpenID.ashx?yeyId=54&backUrl=http://www.krbb.cn/leave/#/login'
					// $state.go('login');
				}
			})
		}
	};
}])
.factory('getClassFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var jsId;
	var token;
	var action = 'manageClass';
	var result;
	var resource = $resource(api+'/KindergartenBasic.ashx',{},{
		query: {
			method: 'get',
			params: {
				jtId: '@jtId',
				yeyId: '@yeyId',
				jsId: '@jsId',
				token: '@token',
				action: '@action'
			}
		}
	})

	return {
		getClass: function(){
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action
			},function(resp){
				if(resp.status){
					result = resp.data;
					$rootScope.$broadcast('Teacher.GetClassUpdated');
				}
			})
		},
		showClass: function(){
			return result;
		}
	};
}])
.factory('agreeLeaveFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var action = 'valid';
	var jsId;
	var token;
	var validStatus = 1;
	var resource = $resource(api+'/Vacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		agreementHandle: function(id){
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action,
				id: id,
				validStatus: validStatus
			},function(resp){
				if(resp.status){
					weui.toast('操作成功', 3000);
					$rootScope.$broadcast('Teacher.TeacherAgreementLeaveUpdated');
				}else{
					weui.alert(resp.err);
				}
			})
		}
	};
}])
.factory('noticeCancelLeaveFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var action = 'notice';
	var jsId;
	var token;
	var resource = $resource(api+'/Vacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		noticeCancelLeave: function(id){
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action,
				id: id,
			},function(resp){
				if(resp.status){
					weui.toast('操作成功', 3000);
					$rootScope.$broadcast('Teacher.NoticeCancelLeaveUpdated');
				}else{
					weui.alert(resp.err);
				}
			})
		}
	};
}])
.factory('teacherSearchFactory', ['$resource','ENV','Storage','$rootScope','$state',function ($resource,ENV,Storage,$rootScope,$state) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var action = 'search';
	var jsId;
	var token;
	var beginTime;
	var endTime;
	var classID;
	var validType = 5;
	var searchType = 4;
	var userType = 1;
	var name = '';
	var pageSize = 6;
	var page;
	var result;
	var hasPage = true;
	var resource = $resource(api+'/Vacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		teacherSearch: function(){
			hasPage = true;
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			beginTime = Storage.get('startDate');
			endTime = Storage.get('endDate');
			classID = Storage.get('classId');
			// validType = Storage.get('statusId');
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action,
				searchType: searchType,
				validType: validType,
				classID: classID,
				userType: userType,
				name: name,
				beginTime: beginTime,
				endTime: endTime,
				pageSize: pageSize,
				page: 1
			},function(resp){
				if(resp.status){
					result = resp.data;
					$rootScope.$broadcast('Teacher.SearchUpdated');
					if(resp.count > (pageSize*1)){
						page = 2;
					}else{
						hasPage = false;
					}
				}else{
					weui.alert(resp.err);
				}
			})
		},
		getMoreTeacherSearch: function(){
			hasPage = true;
			if(!!Storage.get('teacher')){
				jsId = Storage.get('teacher').yhId;
				token = Storage.get('teacher').token;
			}
			if(!!Storage.get('teacherArr')){
				jsId = Storage.get('teacherArr').children[0].yhId;
				token = Storage.get('teacherArr').children[0].token;
			}
			beginTime = Storage.get('startDate');
			endTime = Storage.get('endDate');
			classID = Storage.get('classId');
			// validType = Storage.get('statusId');
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jsId: jsId,
				token: token,
				action: action,
				searchType: searchType,
				validType: validType,
				classID: classID,
				userType: userType,
				name: name,
				beginTime: beginTime,
				endTime: endTime,
				pageSize: pageSize,
				page: page
			},function(resp){
				if(resp.status){
					result = result.concat(resp.data);
					$rootScope.$broadcast('Teacher.SearchUpdated');
					if(resp.count > (pageSize*page)){
						page++;
					}else{
						hasPage = false;
					}
				}else{
					weui.alert(resp.err);
				}
			})
		},
		hasNextPage: function(){
			return hasPage;
		},
		getSearchResult: function(){
			return result;
		}
	};
}])
.factory('delLeaveFactory', ['$resource','ENV','Storage','$rootScope',function ($resource,ENV,Storage,$rootScope) {
	var api = ENV.api;
	var yeyId = ENV.yeyId;
	var jtId = 0;
	var action = 'delete';
	var jzId;
	var token;
	var resource = $resource(api+'/ParentVacation.ashx',{},{
		query: {
			method: 'post',
			timeout: 20000
		}
	})

	return {
		delLeave: function(id){
			if(!!Storage.get('children')){
				jzId = Storage.get('children').jzId;
				token = Storage.get('children').token;
			}
			if(!!Storage.get('childrenArr')){
				jzId = Storage.get('childrenArr').children[0].jzId;
				token = Storage.get('childrenArr').children[0].token;
			}
			resource.query({
				jtId: jtId,
				yeyId: yeyId,
				jzId: jzId,
				token: token,
				action: action,
				id: id
			},function(resp){
				if(resp.status){
					weui.toast('删除成功', 3000);
					$rootScope.$broadcast('Home.DeleteLeaveUpdated');
				}else{
					weui.alert(resp.err);
				}
			})
		}
	};
}])