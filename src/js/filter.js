angular.module('app.filter',[]).filter('dateFormat',['$filter',function($filter){
	return function(date){
		console.log(123)
		var resultDate;
		var dateArr = [];
		var timeStamp = Date.parse(date);
		resultDate = $filter('date')(timeStamp,'yyyy年MM月dd日 HH:mm:ss EEEE');
		dateArr = resultDate.split(' ');
		switch (dateArr[2]) {
			case 'Monday':
				dateArr.splice(2,1,'星期一');
				break;
			case 'Tuesday':
				dateArr.splice(2,1,'星期二');
				break;
			case 'Wednesday':
				dateArr.splice(2,1,'星期三');
				break;
			case 'Thursday':
				dateArr.splice(2,1,'星期四');
				break;
			case 'Friday':
				dateArr.splice(2,1,'星期五');
				break;
			case 'Saturday':
				dateArr.splice(2,1,'星期六');
				break;
			case 'Sunday':
				dateArr.splice(2,1,'星期日');
			default:
				dateArr;
		}
		console.log(dateArr);
		return dateArr.join(' ')
	}
}])