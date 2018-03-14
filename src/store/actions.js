import * as types from './mutation-types'

function updateList (list, obj) {
	let cIndex = list.findIndex((item) => {
		return item.count === 0
	})
	if (cIndex > -1) {
		list.splice(cIndex, 1)
		return list
	}
	let idIndex = list.findIndex((item) => {
		return item.id === obj.id
	})
	if (idIndex === -1) {
		list.push(obj)
		return list
	}
	return list.slice()
}

export function cartCont ({commit, state}, food) {
	// slice()，不会修改原始数组而是返回一个新数组
	let foodList = state.foodList.slice()
	let count = 0
	// let isExist = false
	foodList = updateList(foodList, food)
	// console.log(foodList)
	// for (let i = 0; i < foodList.length; i++) {
	// 	if (foodList[i].id === food.id) {
	// 		isExist = true
	// 	}
	// }
	// if (!isExist) {
	// 	foodList.push(food)
	// 	foodList = foodList.slice()
	// }
	for (let i = 0; i < foodList.length; i++) {
		count += foodList[i].count
	}
	commit(types.SET_FOODLIST, foodList)
	// console.log(count)
	commit(types.SET_COUNT, count)
}
