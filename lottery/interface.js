 import $ from 'jquery'
class Interface{
	getOmit(issue){
		let self = this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'get/omit',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(resp){
					self.setOmit(resp.data);
					resolve.call(self,resp);
				},
				error:function(err){
					reject.call(self);
				}
			})
		})
	}

	getOpenCode(issue){
		let self = this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'get/opencode',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(resp){
					self.setOpenCode(resp.data);
					resolve.call(self,resp);
				},
				error:function(err){
					reject.call(self);
				}
			})
		})
	}

	getState(issue){
		let self = this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'get/state',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(resp){
					self.setState(resp.data);
					resolve.call(self,resp);
				},
				error:function(err){
					reject.call(self);
				}
			})
		})
	}
}

export default Interface;