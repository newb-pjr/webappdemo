import * as types from './mutation-types'

export const mutations = {
	[types.SET_FOODLIST] (state, foodList) {
		state.foodList = foodList
	},
	[types.SET_COUNT] (state, count) {
		state.count = count
	}
}
