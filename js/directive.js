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
.directive('tabsShow', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		link: function(scope) {
			$rootScope.tabsHide = '';
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
			scope.selectId = 'all';
			scope.select = function(items){
				scope.selectId = items.id;
			}
		}
	};
}])
.directive('getCheckedValue', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		scope: {
			ngModel: '='
		},
		link: function(scope, iElm, iAttrs, ngController) {
			scope.$on('Order.recordBillUpdated',function(){
				for(var i=0; i<$rootScope.record.length; i++){
					$rootScope.record[i].checked = false;
				}
			})
			iElm.bind('click',function(){
				console.log($rootScope.record)
				// for(var i=0; i<$rootScope.record.length; i++){
				// 	$rootScope.record[i].checked = true;
				// }
				
			})
			
		}
	};
}]);