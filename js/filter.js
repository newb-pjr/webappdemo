angular.module("app.filter",[]).filter('timeFormat',[function(){
	return function(time){
		var timeStr;
		if(time){
			timeStr = time.split(" ")[0]+'\n'+time.split(" ")[1];
		}else{
			timeStr = "未到库";
		}
		return timeStr;
	}
}])