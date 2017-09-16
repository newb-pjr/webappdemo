class Timer{
	countDown(end,update,handle){
		const now = new Date().getTime();
		let self = this;
		if(now>end){
			handle.call(self);
		}else{
			let last_time = now - end;
			const d = 1000*60*60*24;
			const h = 1000*60*60;
			const m = 1000*60;
			const s = 1000;
			let last_d = Math.floor(last_time/d);
			let last_h = Math.floor((last_time-(last_time*d))/h);
			let last_m = Math.floor((last_time-(last_time*d+last_time*h))/m);
			let last_s = Math.floor((last_time-(last_time*d+last_time*h+last_time*m))/s);
			r = [];
			r.push(last_d);
			if(r.length>0||last_h>0){
				r.push(last_h);
			}
			if(r.length>0||last_m>0){
				r.push(last_m);
			}
			if(r.length>0||last_s>0){
				r.push(last_s);
			}
			last_time = r.join();
			update(self,r.join);
			setTimeout(function(){
				countDown();
			}, 1000)
		}
	}
}