import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import 'common/stylus/index.styl'

Vue.use(VueLazyLoad, {
	loading: require('common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  render: h => h(App)
})
