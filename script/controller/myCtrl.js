angular.module("app").controller('myCtrl', ['$scope','$cookieStore', function($scope,$cookieStore){
	if($cookieStore.get('name')){
		$scope.name = $cookieStore.get('name');
		$scope.image = $cookieStore.get('image');
	}else {
		$scope.name = false;
	}
	$scope.logout = function(){
		$cookieStore.remove('id');
		$cookieStore.remove('name');
		$cookieStore.remove('image');
		$scope.name = false;
	}
}])