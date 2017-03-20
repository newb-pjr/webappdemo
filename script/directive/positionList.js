angular.module('app').directive('appPosition', ['$http',function($http){
	return{
		restrict: 'A',
		replace: true,
		scope: {
			data: '=',
			filterObj: '=',
			isFavorite: '='
		},
		templateUrl: 'view/template/positionList.html',
		link: function(scope){
			scope.select = function(item){
				$http.post('data/favorite.json',{
					id: item.id,
					select: !item.select
				}).success(function(resp){
					item.select = !item.select;
				})
			}
		}
	};
}])
