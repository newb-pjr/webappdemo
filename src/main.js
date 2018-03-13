import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Store from './store'

import 'common/stylus/icon.styl'

Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Store,
  render: h => h(App)
})
