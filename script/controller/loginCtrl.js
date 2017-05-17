angular.module("app").controller('loginCtrl', ['$scope','$cookieStore','$http','$state', function($scope,$cookieStore,$http,$state){
	$scope.submit = function(){
		$http.post('data/login.json',$scope.user).success(function(resp){
			$cookieStore.put('id',resp.id);
			$cookieStore.put('name',resp.name);
			$cookieStore.put('image',resp.image);
			$state.go('tabs.search');
		})
	}
}])