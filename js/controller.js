angular.module("app.controller",[]).controller('startCtrl', ['$scope', function($scope){
		console.log(789)
	$scope.select = function(obj){
		console.log(789)
	}
}])
.controller('infoCtrl', ['$scope', function($scope){
	
	// $scope.length = $scope.length || 0;
	// $scope.width = $scope.width || 0;
	// $scope.height = $scope.height || 0;

	// $scope.result = $scope.length*$scope.width*$scope.height/6000;
	// console.log($scope.result);
}])