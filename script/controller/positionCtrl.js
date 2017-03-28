angular.module('app').controller('positionCtrl',['$q', '$http', '$state', '$scope', '$cookieStore', '$log', function($q,$http,$state,$scope,$cookieStore,$log){
	$scope.isLogin = !!$cookieStore.get('name');
	$scope.message = $scope.isLogin?'投个简历':'去登陆';
	function getPosition(){
		var def = $q.defer();
		$http.get('/data/position.json?id='+$state.params.id).then(function(resp){
			$scope.position = resp;
			if($scope.isLogin){
				if(resp.data.posted){
					$scope.message = '已投递';
				}
			}
			def.resolve(resp);
		}).catch(function(err){
			def.reject(err);
		})
		return def.promise;
	}
	function getCompany(id){
		$http.get('/data/company.json?id='+id).then(function(resp){
			$scope.company = resp;
		})
	}
	getPosition().then(function(obj){
		getCompany(obj.companyId);
	})
	$scope.go = function(){
		if($scope.message !== "已投递"){
			if($scope.isLogin){
				$http.post('data/handle.json',{
					id: $scope.position.id,
					posted: !$scope.position.posted
				}).success(function(resp){
					$log.info(resp);
					$scope.message = '已投递';
				})
			}else{
				$state.go('login');
			}
		}
	}
}]);
