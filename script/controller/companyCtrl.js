angular.module("app").controller('companyCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$http.get("data/company.json?"+$state.params.id).success(function(resp){
		$scope.company = resp;
	})
}])