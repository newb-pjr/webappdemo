angular.module('app').controller('loginCtrl',['$http','$scope','$cookieStore','$state',function($http,$scope,$cookieStore,$state){
	$scope.submit = function(){
		$http.post('data/login.json',$scope.user).success(function(resp){
			$cookieStore.put('id',resp.data.id);
			$cookieStore.put('name',resp.data.name);
			$cookieStore.put('image',resp.data.image);
			$state.go('main');
		})
	}
}]);
