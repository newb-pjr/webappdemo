import Vuex from 'vuex'
import Vue from 'vue'
import orderList from 'modules/orderList'
Vue.use(Vuex)

export default new Store({
	modules: {
		orderList
	}
})