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
.factory('newsContentFactory', ['$rootScope','ENV','$resource', function($rootScope,ENV,$resource){
	var api = ENV.api;
	var aid;
	var newsCont;
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
		getNews: function(){
			resource.query({
				aid:aid
			},function(resp){
				newsCont = resp.result[0].content;
				$rootScope.$broadcast('newsContent.newsUpdated');
			})
		},
		getNewsAid: function(a_id){
			aid = a_id;
			this.getNews();
		},
		getNewsContent: function(){
			return newsCont;
		}
	};
}])
.factory('threadContentFactory', ['$rootScope','ENV','$resource', function($rootScope,ENV,$resource){
	var api = ENV.api;
	var tid;
	var threadCont;
	var resource = $resource(api, {}, {
		query: {
			method: 'get',
			params: {
				a: 'getThreadContent',
				tid: '@tid'
			},
			timeout: 20000
		}
	})
	return {
		getThread: function(){
			resource.query({
				tid:tid
			},function(resp){
				threadCont = resp.result;
				$rootScope.$broadcast('threadContent.threadsUpdated');
			})
		},
		getThreadTid: function(t_id){
			tid = t_id;
			this.getThread();
		},
		getThreadContent: function(){
			return threadCont;
		}
	};
}])
.factory('Storage', [function(){
	return {
		save:function(key,value){
			return window.localStorage.setItem(key,window.JSON.stringify(value));
		},
		get:function(key){
			return window.JSON.parse(window.localStorage.getItem(key));
		},
		remove:function(key){
			return window.localStorage.removeItem(key);
		}
	};
}])