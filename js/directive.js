angular.module("app.directive",[]).directive('tabsHide', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		link: function(scope) {
			$rootScope.tabsHide = 'tabs-item-hide';
			scope.$on('$destroy',function(){
				$rootScope.tabsHide = '';
			})
		}
	};
}])
.directive('topTabs', [function(){
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: 'view/tabs/person/topTabs.html',
		scope: {
			tabList: '='
		},
		link: function(scope){
			if(scope.tabList.isActive){
				scope.actived = 'active';
			}
			scope.select = function(items){
				// angular.forEach(scope.tabList,function(item){
				// 	if(items.id == item.id){
				// 		console.log(item.id)
				// 		console.log(items.id)
				// 		scope.isActive = true;
				// 	}else{
				// 		scope.isActive = false;
				// 	}
				// })
				scope.selectId = items.id;
			}
		}
	};
}]);