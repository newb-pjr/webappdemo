angular.module("app").controller('searchCtrl', ['$scope','dict','$ionicActionSheet','$ionicTabsDelegate','$http','$timeout', function($scope,dict,$ionicActionSheet,$ionicTabsDelegate,$http,$timeout){
	var city = dict.city
	var salary = dict.salary;
	var scale = dict.scale;
	var sheet = [];
	var tabCont;
	var page = 2;
	$http.get("data/positionList.json").success(function(resp){
		$scope.data = resp;
		var data = resp;
	})

	$scope.doRefresh = function(){
		page = 2;
		$scope.nextPage = true;
		$http.get("data/positionList1.json").success(function(resp){
		console.log(page)
			$scope.data = resp;
		}) 
		.finally(function() {
       // 停止广播ion-refresher
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	}

	$scope.nextPage = true;
	$scope.load_more = function(){
		var loadMore = $timeout(function(){
			page--;
			$http.get("data/positionList.json").success(function(resp){
				for(var i=0; i<resp.length; i++){
					$scope.data.push(resp[i]);
					$scope.$broadcast("scroll.infiniteScrollComplete");
				}
			})
			if(page == 1){
				$scope.nextPage = false;
			}
			console.log(page);
		},2000);
	}
	$scope.filter = function(title){
		sheet = [];
		switch(title){
			case '城市':
				tabCont = city;
				$ionicTabsDelegate.$getByHandle('my-tab').select(0);
				break;
			case '薪资':
				tabCont = salary;
				$ionicTabsDelegate.$getByHandle('my-tab').select(1);
				break;
			case '公司规模':
				tabCont = scale;
			default:
				$ionicTabsDelegate.$getByHandle('my-tab').select(2);
				break;
		}
		for(var i=0; i<tabCont.length; i++){
			sheet.push({text:tabCont[i].name})
		}
		$ionicActionSheet.show({
			buttons: sheet,
			cancelText: '取消'
		})
	}
}])