angular.module("app.services",[]).factory('newsFactory', ['$rootScope','$resource','ENV', function($rootScope,$resource,ENV){
		var api = ENV.api;
		var catid = 20;
		var topic;

		var resource = $resource(api, {}, {
			query:{
				method: 'get',
				params: {
					a: 'getPortalList',
					catid: '@catid',
					page: '@page'
				},
				timeout: 20000
			}
		})

		return{
			getTopTopics: function(){
				resource.query({
					catid:catid,
					page:1
				},function(resp){
					topic = resp.result;
					$rootScope.$broadcast("PortalList.portalsUpdated");
				})
			},
			getNews: function(){
				return topic;
			}
		}
}])