angular.module('app').controller('companyCtrl',['$http', '$state', '$scope',function($http,$state,$scope){
	$http.get('/data/company.json?'+$state.params.id).then(function(resp){
		$scope.company = resp;
	})
}]);
