import * as types from './mutation-types'

export function cartCont ({commit, state}, food) {
	let arr = state.foodList
	let count = 0
	for (let i = 0; i < arr.length; i++) {
		count += arr[i].count
	}
	commit(types.SET_FOODLIST, arr)
	commit(types.SET_COUNT, count)
}
