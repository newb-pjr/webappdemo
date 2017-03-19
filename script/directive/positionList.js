angular.module('app').directive('appPosition', ['$cookieStore','$http',function($cookieStore,$http){
	return{
		restrict: 'A',
		replace: true,
		scope: {
			data: '=',
			filterObj: '='
		},
		templateUrl: 'view/template/positionList.html',
		link: function(scope){
			scope.name = $cookieStore.get('name') || '';
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
