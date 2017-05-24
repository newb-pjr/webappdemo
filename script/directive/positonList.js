angular.module("app").directive('appPosition', ['$http',function($http){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/positionList.html',
		scope: {
			data: '=',
			isFavorite: '=',
			filterObj: '='
		},
		link: function(scope){
			scope.select = function(item,$event){
				$http.post("data/favorite.json",{
					id: item.id,
					select: !item.select
				}).success(function(resp){
					item.select = !item.select;
				})
				 // $event.stopPropagation(); 
			}
		}
	};
}]);