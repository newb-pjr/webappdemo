<template>
  <div>
    <s-header :seller="seller"></s-header>
    <div class="nav">
      <router-link :to="{path:'goods'}" class="item">商品</router-link>
      <router-link :to="{path:'ratings'}" class="item">评价</router-link>
      <router-link :to="{path:'seller'}" class="item">商家</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import SHeader from 'components/head/head'
import {ERR_OK} from 'common/js/config'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((resp) => {
      if (resp.data.errorNum === ERR_OK) {
        this.seller = resp.data.data
        console.log(this.seller)
      }
    })
  },
  components: {
    SHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index'
  .nav
    display: flex
    height: 40px
    .item
      flex: 1
      font-size: 14px
      line-height: 40px
      text-align: center
      color: rgb(77, 85, 93)
      &.router-link-exact-active
        color: $color-text-red
</style>
