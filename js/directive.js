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
			tabList: '=',
			selectClick: '&'
		},
		link: function(scope){
			scope.selectId = '0';
			scope.select = function(items){
				scope.selectId = items.id;
				scope.selectClick(items);
			}
		}
	};
}])
.directive('getCheckedValue', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		scope: {
			ngModel: '=',
			data: '=',
			state: '='
		},
		link: function(scope, iElm, iAttrs, ngController) {
			// scope.$on('Order.recordBillUpdated',function(){
			// 	console.log(scope.data)
			// 	for(var i=0; i<scope.data.length; i++){
			// 		scope.data[i].checked = false;
			// 	}
			// })
			iElm.bind('change',function(){
				console.log(scope.data)
				if(scope.state){
					for(var i=0; i<scope.data.length; i++){
						scope.data[i].checked = true;
					}
					console.log(scope.state)
				}else{
					for(var i=0; i<scope.data.length; i++){
						scope.data[i].checked = false;
					}
				}
									
			})
			
		}
	};
}])
.directive('singleChecked', ['$rootScope', function($rootScope){
	return {
		restrict: 'AE',
		scope: {
			ngModel: '=',
			data: '=',
			index: '='
		},
		link: function(scope, iElm, iAttrs, ngController) {
			iElm.bind('change',function(){
				for(var i=0; i<scope.data.length; i++){
					scope.data[i].checked = false;
				}
				// if(scope.ngModel){
				// 	for(var i=0; i<scope.data.length; i++){
				// 		if(scope.index!=i){
				// 			scope.data[i].checked = false;
				// 		}
				// 	}
				// 		console.log(scope.data);
				// }
				
			})
			
		}
	};
}]);