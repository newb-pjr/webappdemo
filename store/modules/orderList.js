import Vue from 'vue'
import router from './router'
const state = {
	orderList = []
	params= ''
}

const getters = {
	getOrdList: state => state.orderList
}

const actions = {
	fetchOrderList ({commit,state}) {
		this.$http.post('api/orderList',{state.params}).then((resp)=>{
			commit('updateOrdList',resp.data.List)
		},(err)=>{

		})
	}
},

const mutations = {
	updateOrdList (state,payLoad) {
		state.orderList = payLoad
	}
}
export default {
  state,
  getters,
  actions,
  mutations
}
