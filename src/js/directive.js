angular.module('app.directive',[]).directive('appTab', [function () {
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'view/app-tab.html',
		scope: {
			sClick: '&',
			item: '='
		},
		link: function (scope, iElement, iAttrs) {
			scope.tabs = [{
				id: 0,
				name: '请假'
			},{
				id: 1,
				name: '销假'
			}]

			scope.selectId = 0;
			scope.selectClick = function(item){
				scope.selectId = item.id
				scope.sClick(item)
			}

			scope.$watch('item',function(newVal){
				if(newVal){
					if(scope.item==='销假'){
						scope.selectId = 1;
					}
				}
			})

		}
	};
}])