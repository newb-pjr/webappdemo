angular.module('app').config(['$validationProvider',function($validationProvider) {
	var expression = {
		phone: /^1[\d]{10}/,
		password: function(value){
			var str = value + '';
			return str.length > 5;
		}
	};
	var defaultMsg = {
		phone: {
			success: '',
			error: '<div>必须是11位手机号码</div>'
		},
		password: {
			success: '',
			error: '密码长度至少为6位'
		}
	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])	