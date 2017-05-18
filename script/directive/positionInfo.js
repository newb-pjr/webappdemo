angular.module("app").directive('appPositionInfo', ['$http',function($http){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/template/tpl/positionInfo.html',
		scope: {
			pos: '=',
			isLogin : '='
		},
		link: function(scope){
			console.log(scope.isLogin)
			scope.$watch('pos',function(newVal){
				if(newVal){
					scope.pos.select = scope.pos.select || false;
					scope.imagePath = scope.pos.select ? 'image/star.png' : 'image/star-active.png';
				}
			})
			scope.favorite = function(){
				$http.post("data/favorite.json",{
					id:scope.pos.id,
					select:!scope.pos.select
				}).success(function(resp){
					scope.pos.select = !scope.pos.select;
					scope.imagePath = scope.pos.select ? 'image/star.png' : 'image/star-active.png';
				})
			}
		}
	};
}]);