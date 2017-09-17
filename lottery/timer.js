class Timer{
	countDown(end,update,handle){
		const now = new Date().getTime();
		const self = this;
		if(now>end){
			handle.call(self);
		}else{
			let last_time = end - now;
			const d = 1000*60*60*24;
			const h = 1000*60*60;
			const m = 1000*60;
			const s = 1000;
			let last_d = Math.floor(last_time/d);
			let last_h = Math.floor((last_time-(last_time*d))/h);
			let last_m = Math.floor((last_time-(last_time*d+last_time*h))/m);
			let last_s = Math.floor((last_time-(last_time*d+last_time*h+last_time*m))/s);
			r = [];
			if(last_d>0){
				r.push(`<em>{$last_d}</em>天`);
			}
			if(r.length>0||last_h>0){
				r.push(`<em>{$last_h}</em>时`);
			}
			if(r.length>0||last_m>0){
				r.push(`<em>{$last_m}</em>分`);
			}
			if(r.length>0||last_s>0){
				r.push(`<em>{$last_s}</em>秒`);
			}
			last_time = r.join('');
			update(self,r.join(''));
			setTimeout(function(){
				self.countDown(end,update,handle);
			}, 1000)
		}
	}
}

export default Timer;