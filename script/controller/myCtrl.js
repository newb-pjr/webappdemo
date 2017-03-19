angular.module('app').controller('myCtrl',['$http','$scope','$cookieStore','$state',function($http,$scope,$cookieStore,$state){
	if($cookieStore.get('name')){
		$scope.image = $cookieStore.get('image');
		$scope.name = $cookieStore.get('name');
	}
	$scope.logout = function(){
		$cookieStore.remove('id');
		$cookieStore.remove('name');
		$cookieStore.remove('image');
		$state.go('main');
	}
}]);
