import Vue from 'vue'
import Router from 'vue-router'
import Singer from '../components/singer/singer'
import Recommend from '../components/recommend/recommend'
import Rank from '../components/rank/rank'
import Search from '../components/search/search'
import SingerDetail from '../components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
