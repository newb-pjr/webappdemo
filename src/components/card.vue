<template>
  <div class="card-container">
    <div class="img">
      <img mode="aspectFit" :src="item.image">
    </div>
    <div class="center">
      <p>{{item.title}}</p>
      <p>{{item.author}}</p>
      <p>{{item.publisher}}</p>
    </div>
    <div class="right">
      <div class="rate">
        {{item.rate}}
        <rate :rate="item.rate"></rate>
      </div>
      <p>{{item.count}}</p>
      <p>{{item.nickName}}</p>
    </div>
  </div>
</template>

<script>
import Rate from './../components/rate'

export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    Rate
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
.card-container
  height: 200rpx
  padding: 20rpx 15rpx 0
  font-size: 0
  .img
    display: inline-block
    width: 20%
    height: 100%
    vertical-align: top
    img
      width: 100%
      height: 100%
  .center
    display: inline-block
    width: 50%
    padding-left: 10rpx
    font-size: 14px
    box-sizing: border-box
    vertical-align: top
  .right
    display: inline-block
    width: 30%
    padding-left: 10rpx
    font-size: 14px
    box-sizing: border-box
    vertical-align: top
    text-align: right
    .rate
      color: #EA5149
</style>
