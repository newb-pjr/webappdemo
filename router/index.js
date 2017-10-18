import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../pages/index'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: indexPage
		}
	]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: HelloWorld
//     }
//   ]
// })
