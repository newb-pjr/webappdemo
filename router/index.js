import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../pages/index'
import detailPage from '../pages/details'
import analysis from '../pages/details/analysis'
import count from '../pages/details/count'
import forecast from '../pages/details/forecast'
import publish from '../pages/details/publish'
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: indexPage
		},
		{
			path: '/details',
			component: detailPage,
			redirect: '/details/analysis',
			children: [
				{
					path: 'analysis',
					component: analysis
				},
				{
					path: 'count',
					component: count
				},
				{
					path: 'forecast',
					component: forecast
				},
				{
					path: 'publish',
					component: publish
				}
			]
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
