angular.module('app').directive('appSearchBar', [function(){
	return{
		restrict: 'A',
		replace: true,
		templateUrl: 'view/template/searchBar.html'
	}
}])
