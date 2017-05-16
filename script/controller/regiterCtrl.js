angular.module("app").controller('registerCtrl', ['$scope','$http','$cookieStore' function($scope,$http,$cookieStore){
	$scope.submit = function(){
		$http.post('data/regisr.json',$scope.user).success(function(resp){
			
		})
	}
}])