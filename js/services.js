angular.module("app.services",[]).factory('newsFactory', ['$rootScope','$resource','ENV', function($rootScope,$resource,ENV){
		var api = ENV.api;
		var catid = 20;
		var topic;
		var nextPage = 2;
		var hasPage = true;

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
					if(resp.result.length<=20){
						hasPage = false;
					}
					$rootScope.$broadcast("PortalList.portalsUpdated");
				})
			},
			getNews: function(){
				return topic;
			},
			getMoreNews: function(){
				resource.query({
					catid:catid,
					page:nextPage
				},function(resp){
					topic = topic.concat(resp.result);
					if(resp.result.length<=20){
						hasPage = false;
					}else{
						nextPage++;
					}
					$rootScope.$broadcast("PortalList.portalsUpdated");
				})
			},
			getNextPage: function(){
				return hasPage;
			}
		}
}])