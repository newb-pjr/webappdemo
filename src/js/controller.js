angular.module('app.controller',[]).controller('recordCtrl', ['$scope','homeLeaveFactory','cancelLeaveFactory','$ionicScrollDelegate','$timeout','delLeaveFactory', function ($scope,homeLeaveFactory,cancelLeaveFactory,$ionicScrollDelegate,$timeout,delLeaveFactory) {
	$scope.leave = true;
	$scope.selClick = function(id){
		$ionicScrollDelegate.scrollTop();
		if(id === 0){
			$scope.leave = true;
			$timeout(function(){
				homeLeaveFactory.getHomeLeaveList(1);
			},20)
		}else{
			$scope.leave = false;
			$timeout(function(){
				homeLeaveFactory.getHomeLeaveList(2);
			},20)
		}
	}

	homeLeaveFactory.getHomeLeaveList(1);

	$scope.$on('Home.HomeLeaveListUpdated',function(){
		$scope.leaveList = homeLeaveFactory.homeLeaveList();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	})

	// $scope.cancelLeave = function(){
	// 	$scope.tabActive = '销假';
	// }

	$scope.cancelLeave = function(id,beginTime,endTime){
		var beginDate = Date.parse(beginTime);
		var endDate = Date.parse(endTime)-(24*60*60*1000);
		weui.datePicker({
		     start: new Date(beginDate), 
		     end: new Date(endDate),
		     onConfirm: function(result){
		     	$scope.startCancelDate = result[0].value + '-' + result[1].value + '-' + result[2].value;
				cancelLeaveFactory.applyLeave(id,$scope.startCancelDate);
		     },
		     id: 'cancelDatePicker'
		});
	}
	$scope.$on('Home.HomeCancelLeaveUpdated',function(){
		$scope.tabActive = '销假';
		$scope.leave = false;
		$scope.leaveList = homeLeaveFactory.getHomeLeaveList(2);
	})

	$scope.doRefresh = function(){
		if($scope.leave){
			homeLeaveFactory.getHomeLeaveList(1);
		}else{
			homeLeaveFactory.getHomeLeaveList(2);
		}
	}

	$scope.loadMore = function(){
		if($scope.leave){
			homeLeaveFactory.getMoreHomeLeaveList(1);
		}else{
			homeLeaveFactory.getMoreHomeLeaveList(2);
		}
	}

	$scope.pageEnd = function(){
		return homeLeaveFactory.hasNextPage();
	}

	$scope.delLeave = function(id){
		delLeaveFactory.delLeave(id);
	}
	$scope.$on('Home.DeleteLeaveUpdated',function(){
		homeLeaveFactory.getHomeLeaveList(1);
	})
}])
.controller('leaveCtrl', ['$scope','teacherLeaveFactory','agreeLeaveFactory','noticeCancelLeaveFactory','$ionicScrollDelegate','$timeout', function ($scope,teacherLeaveFactory,agreeLeaveFactory,noticeCancelLeaveFactory,$ionicScrollDelegate,$timeout) {
	$scope.leave = true;
	$scope.selClick = function(id){
		$ionicScrollDelegate.scrollTop();
		if(id === 0){
			$scope.leave = true;
			$timeout(function(){
				teacherLeaveFactory.getTeacherLeaveList(1);
			},20)
		}else{
			$scope.leave = false;
			$timeout(function(){
				teacherLeaveFactory.getTeacherLeaveList(2);
			},20)
		}
	}

	teacherLeaveFactory.getTeacherLeaveList(1);

	$scope.$on('Teacher.TeacherLeaveListUpdated',function(){
		$scope.leaveList = teacherLeaveFactory.teacherLeaveList();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	})

	$scope.agreement = function(id){
		agreeLeaveFactory.agreementHandle(id);
	}
	// $scope.$on('Teacher.TeacherAgreementLeaveUpdated',function(){
	// 	teacherLeaveFactory.getTeacherLeaveList(1);
	// })

	$scope.notice = function(id){
		noticeCancelLeaveFactory.noticeCancelLeave(id)
	}
	// $scope.$on('Teacher.NoticeCancelLeaveUpdated',function(){
	// 	teacherLeaveFactory.getTeacherLeaveList(1);
	// })

	$scope.cancelAgreement = function(id){
		agreeLeaveFactory.agreementHandle(id);
	}
	$scope.$on('Teacher.TeacherAgreementLeaveUpdated',function(){
		if($scope.leave){
			teacherLeaveFactory.getTeacherLeaveList(1);
		}else{
			teacherLeaveFactory.getTeacherLeaveList(2);
		}
	})

	$scope.doRefresh = function(){
		if($scope.leave){
			teacherLeaveFactory.getTeacherLeaveList(1);
		}else{
			teacherLeaveFactory.getTeacherLeaveList(2);
		}
	}

	$scope.loadMore = function(){
		if($scope.leave){
			teacherLeaveFactory.getMoreTeacherLeaveList(1);
		}else{
			teacherLeaveFactory.getMoreTeacherLeaveList(2);
		}
	}

	$scope.pageEnd = function(){
		return teacherLeaveFactory.hasNextPage();
	}
}])
.controller('wxLoginCtrl', ['$scope','wxLoginFactory', function ($scope,wxLoginFactory) {
	wxLoginFactory.login()
}])
.controller('loginCtrl', ['$scope','$ionicModal','loginFactory', function ($scope,$ionicModal,loginFactory) {
	$scope.user = {
		username: '',
		password: ''
	}

	// $ionicModal.fromTemplateUrl('view/choose-child.html', {
	//     scope: $scope,
	//     animation: 'slide-in-up'
	// }).then(function(modal) {
	//     $scope.modal = modal;
	// });
	// $scope.$on('modal.show', function() {
 //    	$scope.chlidList = Storage.get('children');
 //  	});
 //  	$scope.$on('$destroy', function() {
 //    	$scope.modal.remove();
 //  	});

	$scope.loginBtn = function(){
		loginFactory.login($scope.user);
	}
}])
.controller('homeCtrl', ['$scope','dateFactory','applyFactory', function ($scope,dateFactory,applyFactory) {
	$scope.start = function(){
		weui.datePicker({
		     start: new Date(), // 从今天开始
		     end: 2030,
		     defaultValue: [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
		     onConfirm: function(result){
		     	$scope.startDate = result[0].value + '-' + result[1].value + '-' + result[2].value
		     	document.getElementById('startDate').innerHTML = $scope.startDate
		     	// $scope.recordStartDate = dateFactory.getStartDate($scope.startDate);
		     	// $scope.dateNum = dateFactory.dateNum($scope.recordStartDate,$scope.recordEndDate);
		     	// document.getElementById('dateNum').innerHTML = $scope.dateNum + '天'
		     },
		     id: 'startDatePicker'
		});
	}
	// $scope.end = function(){
	// 	weui.datePicker({
	// 	     start: new Date(), // 从今天开始
	// 	     end: 2030,
	// 	     defaultValue: [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()+1],
	// 	     onChange: function(result){
	// 	     },
	// 	     onConfirm: function(result){
	// 	     	$scope.endDate = result[0].value + '-' + result[1].value + '-' + result[2].value
	// 	     	document.getElementById('endDate').value = $scope.endDate
	// 	     	$scope.recordEndDate = dateFactory.getEndDate($scope.endDate);
	// 	     	$scope.dateNum = dateFactory.dateNum($scope.recordStartDate,$scope.recordEndDate);
	// 	     	document.getElementById('dateNum').innerHTML = $scope.dateNum + '天'
	// 	     },
	// 	     id: 'endDatePicker'
	// 	});
	// }
	$scope.subApply = function(){
		if(isNaN($scope.dateNum)){
			$scope.dateNum = '';
			weui.alert('请输入有效的天数');
			return;
		}
		if($scope.dateNum <= 0){
			$scope.dateNum = '';
			weui.alert('请输入有效的天数');
			return;
		}
		applyFactory.applyLeave($scope.startDate,$scope.dateNum)
	}
}])
.controller('tabHomeCtrl', ['$scope','Storage','logoutFactory', function ($scope,Storage,logoutFactory) {
	if(!!Storage.get('children')){
		$scope.name = Storage.get('children').yeName;
		$scope.class = Storage.get('children').bjName;
		$scope.Kindergarten = Storage.get('children').yeyName;
		$scope.hasAvatar = false;
		$scope.avatar = Storage.get('children').yePic;
		if(!!$scope.avatar){
			$scope.hasAvatar = true;
		}else{
			$scope.hasAvatar = false;
		}
	}
	if(!!Storage.get('childrenArr')){
		$scope.name = Storage.get('childrenArr').children[0].yeName;
		$scope.class = Storage.get('childrenArr').children[0].bjName;
		$scope.Kindergarten = Storage.get('childrenArr').children[0].yeyName;
		$scope.hasAvatar = false;
		$scope.avatar = Storage.get('childrenArr').children[0].yePic;
		if(!!$scope.avatar){
			$scope.hasAvatar = true;
		}else{
			$scope.hasAvatar = false;
		}
	}

	$scope.logout = function(){
		logoutFactory.logout(2);
		$scope.$on('User.UserLogoutUpdated',function(){
			if(!!Storage.get('children')){
				Storage.remove('children');
			}
			if(!!Storage.get('childrenArr')){
				Storage.remove('childrenArr');
			}
		})
	}
}])
.controller('tabTeacherCtrl', ['$scope','Storage','logoutFactory', function ($scope,Storage,logoutFactory) {
	if(!!Storage.get('teacher')){
		$scope.name = Storage.get('teacher').zgName;
		$scope.class = Storage.get('teacher').bjName;
		$scope.Kindergarten = Storage.get('teacher').yeyName;
		$scope.hasAvatar = false;
		$scope.avatar = Storage.get('teacher').yePic;
		if(!!$scope.avatar){
			$scope.hasAvatar = true;
		}else{
			$scope.hasAvatar = false;
		}
	}
	if(!!Storage.get('teacherArr')){
		$scope.name = Storage.get('teacherArr').children[0].zgName;
		$scope.class = Storage.get('teacherArr').children[0].bjName;
		$scope.Kindergarten = Storage.get('teacherArr').children[0].yeyName;
		$scope.hasAvatar = false;
		$scope.avatar = Storage.get('teacherArr').children[0].yePic;
		if(!!$scope.avatar){
			$scope.hasAvatar = true;
		}else{
			$scope.hasAvatar = false;
		}
	}

	$scope.logout = function(){
		logoutFactory.logout(1);
		$scope.$on('User.UserLogoutUpdated',function(){
			if(!!Storage.get('teacher')){
				Storage.remove('teacher');
			}
			if(!!Storage.get('teacherArr')){
				Storage.remove('teacherArr');
			}
		})

	}
}])
.controller('searchCtrl', ['$scope','getClassFactory','$state','Storage', function ($scope,getClassFactory,$state,Storage) {
	$scope.start = function(){
		weui.datePicker({
		     start: 2000,
		     end: 2030,
		     defaultValue: [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
		     onConfirm: function(result){
		     	$scope.startDate = result[0].value + '-' + result[1].value + '-' + result[2].value
		     	document.getElementById('searchStartDate').innerHTML = $scope.startDate
		     },
		     id: 'startDatePicker'
		});
	}

	$scope.end = function(){
		if(!$scope.startDate){
			weui.alert('请选择开始时间，再选择结束时间');
			return;
		}
		weui.datePicker({
		     start: new Date(Date.parse($scope.startDate)),
		     end: 2030,
		     defaultValue: [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()+1],
		     onChange: function(result){
		     },
		     onConfirm: function(result){
		     	$scope.endDate = result[0].value + '-' + result[1].value + '-' + result[2].value
		     	document.getElementById('searchEndDate').innerHTML = $scope.endDate
		     },
		     id: 'endDatePicker'
		});
	}

	// $scope.status = function(){
	// 	weui.picker([
	// 	{
	// 	    label: '未审核',
	// 	    value: -1,
	// 	},
	// 	{
	// 	    label: '审核通过',
	// 	    value: 1
	// 	},
	// 	{
	// 	    label: '全部',
	// 	    value: 2
	// 	}
	// 	], {
	// 	   container: 'body',
	// 	   defaultValue: [-1],
	// 	   onChange: function (result) {
	// 	   },
	// 	   onConfirm: function (result) {
	// 	   		$scope.statusId = result[0].value;
	// 	   		document.getElementById('status').innerHTML = result[0].label;
	// 	   },
	// 	   id: 'statusPicker'
	// 	});
	// }

	$scope.class = function(){
		getClassFactory.getClass();
	}
	$scope.$on('Teacher.GetClassUpdated',function(){
		var newArrObj = [{
			label: '全部',
			value: -1
		}];
		var obj = {};
		$scope.classData = getClassFactory.showClass();
		angular.forEach($scope.classData,function(data){
			obj = {};
			obj['label'] = data.name;
			obj['value'] = data.id;
			this.push(obj);
		},newArrObj)
		weui.picker(newArrObj, {
		   container: 'body',
		   defaultValue: [-1],
		   onChange: function (result) {
		   },
		   onConfirm: function (result) {
		       $scope.classId = result[0].value;
		   	   document.getElementById('class').innerHTML = result[0].label;
		   },
		   id: 'classPicker'
		});
	})

	$scope.subSearch = function(){
		if(!$scope.startDate || !$scope.endDate || !$scope.classId){
			weui.alert('搜索条件不能为空');
			return;
		}
		Storage.set('startDate',$scope.startDate);
		Storage.set('endDate',$scope.endDate);
		Storage.set('classId',$scope.classId);
		// Storage.set('statusId',$scope.statusId);
		$state.go('tab-teacher.record');
	}
	// $scope.$on('Teacher.SearchUpdated',function(){
	// 	$scope.leaveList = teacherSearchFactory.getSearchResult();
	// 	console.log($scope.leaveList);
	// })
}])
.controller('searchRecordCtrl', ['$scope','teacherSearchFactory', function ($scope,teacherSearchFactory) {
	teacherSearchFactory.teacherSearch();
	$scope.$on('Teacher.SearchUpdated',function(){
		$scope.leaveList = teacherSearchFactory.getSearchResult();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	})
	
	$scope.doRefresh = function(){
		teacherSearchFactory.teacherSearch();
	}

	$scope.loadMore = function(){
		teacherSearchFactory.getMoreTeacherSearch()
	}

	$scope.pageEnd = function(){
		return teacherSearchFactory.hasNextPage();
	}
}])