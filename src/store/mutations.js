import * as types from './mutation-types'

const mutations = {
	[types.SET_FOODLIST] (state, foodList) {
		state.foodList = foodList
	},
	[types.SET_COUNT] (state, count) {
		state.count = count
	},
	[types.SET_PRICE] (state, price) {
		state.price = price
	}
}

export default mutations
