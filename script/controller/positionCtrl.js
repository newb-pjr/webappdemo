angular.module('app').controller('positionCtrl',['$q', '$http', '$state', '$scope', function($q,$http,$state,$scope){
	function getPosition(){
		var def = $q.defer();
		$http.get('/data/position.json?id='+$state.params.id).then(function(resp){
			$scope.position = resp;
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
}]);
