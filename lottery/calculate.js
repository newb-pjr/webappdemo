class Calculate{
	computeBets(active,play_name){
		let count = 0;
		const exist = this.play_list.has(play_name);
		const arr = new Array(active).fill('0');
		if(exist && play_name.at(0)==='r'){
			count = Calculate.combine(arr,play_name.split('')[1]);
		}
		return count;
	}

	static combine(arr,size){
		let allResult = [];
		(function f(arr,size,result){
			let arrlen = arr.length;
			if(size>arrlen){
				return;
			}
			if(size===arrlen){
				allResult.push([].concat(result, arr))
			}else{
				for(let i=0;i<arrlen;i++){
					let newResult = [].concat(result);
					newResult.push(arr[i]);
					if(size===1){
						allResult.push(newResult);
					}else{
						let newArr = [].concat(arr);
						newArr.splice(0, i+1);
						f(newArr,size-1,newResult);
					}
				}
			}
		})(arr,size,[])
	}
}