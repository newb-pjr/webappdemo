angular.module("app").controller('searchCtrl', ['$scope','dict','$ionicActionSheet', function($scope,dict,$ionicActionSheet){
	var city = dict.city
	var sheet = [];
	for(var i=0; i<city.length; i++){
		sheet.push({text:city[i]})
	}
	console.log(JSON.stringify(sheet))
	$scope.filter = function(){
		$ionicActionSheet.show({
			buttons: JSON.stringify(sheet)
		})
	}
}])