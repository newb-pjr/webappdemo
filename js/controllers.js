angular.module("app.controllers",[]).controller('newsCtrl', ['$scope','newsFactory','ENV', function($scope,newsFactory,ENV){
	newsFactory.getTopTopics();
	$scope.$on("PortalList.portalsUpdated",function(){
		$scope.data = newsFactory.getNews();
	});
	$scope.ENV = ENV;
}])