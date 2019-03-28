<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <a :href="detailUrl(item.id)">
          <card :item="item"></card>
        </a>
      </li>
    </ul>
    <p class="no-more" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
import {get} from '../../util'
import config from './../../config'
import Card from './../../components/card'

export default {
  data () {
    return {
      page: 0,
      more: true,
      list: []
    }
  },
  onShow () {
    this._getBooksList(true)
  },
  onPullDownRefresh () {
    this._getBooksList(true)
  },
  onReachBottom () {
    this._getBooksList(false)
  },
  methods: {
    detailUrl (id) {
      console.log(id)
      return '/pages/detail/main?id=' + id
    },
    _getBooksList (flag) {
      if (flag) {
        this.page = 0
        this.more = true
      } else if (!flag && !this.more) {
        return
      } else {
        this.page++
      }
      wx.showNavigationBarLoading()
      get(config.booksListUrl, {page: this.page}).then((resp) => {
        if (flag) {
          this.list = resp.list
          wx.stopPullDownRefresh()
        } else {
          if (resp.list.length < 8 && this.page !== 0) {
            this.more = false
          }
          this.list = [...this.list, ...resp.list]
        }
        wx.hideNavigationBarLoading()
      })
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
.no-more
  margin: 20rpx 0
  font-size: 14px
  text-align: center
</style>
