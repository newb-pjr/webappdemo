angular.module("app.services",[]).factory('newsFactory', ['$rootScope','$resource','ENV', function($rootScope,$resource,ENV){
		var api = ENV.api;
		var catid = 20;
		var topic;
		var nextPage;
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
					if(resp.result.length<20){
						hasPage = false;
					}
					nextPage = 2;
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
					if(resp.result.length<20){
						hasPage = false;
					}else{
						nextPage++;
					}
					$rootScope.$broadcast("PortalList.portalsUpdated");
				})
			},
			setNewsCatid: function(cate_id){
				catid = cate_id;
				hasPage = true;
				this.getTopTopics();
			},
			hasNextPage: function(){
				return hasPage;
			}
		}
}])
.factory('threadFactory', ['$rootScope','$resource','ENV', function($rootScope,$resource,ENV){
	var api = ENV.api;
	var fid = 2;
	var thread;
	var hasPage = true;
	var resource = $resource(api, {}, {
		query: {
			method: 'get',
			params: {
				a: 'getThreadList',
				fid: '@fid',
				page: '@page'
			},
			timeout: 20000
		}
	})

	return {
		getFirstThreadList: function(){
			resource.query({
				fid: fid,
				page: 1
			},function(resp){
				thread = resp.result;
				if(resp.result.length<20){
					hasPage = false;
				}
				nextPage = 2;
				$rootScope.$broadcast('threadList.threadsUpdated');
			})
		},
		getThread: function(){
			return thread;
		},
		getMoreThread: function(){
			resource.query({
				fid: fid,
				page: nextPage
			},function(resp){
				thread = thread.concat(resp.result);
				if(resp.result.length<20){
					hasPage = false;
				}else{
					nextPage++;
				}
				$rootScope.$broadcast('threadList.threadsUpdated');
			})
		},
		hasNextPage: function(){
			return hasPage;
		}
	};
}])
.factory('newsContentFactory', ['ENV','$resource', function(ENV,$resource){
	var api = ENV.api;
	var resource = $resource(api, {}, {
		query:{
			method: 'get',
			params:{
				a:'getPortalArticle',
				aid:'@aid'
			}
		}
	})

	return {
		getNewsContent: function(){
			resource.query({
				aid:aid
			},function(resp){
				return resp.result.content;
			})
		},
		getNewsAid: function(a_id){
			aid = a_id;
			this.getNewsContent();
		}
	};
}])