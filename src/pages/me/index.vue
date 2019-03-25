<template>
  <div class="me-container">
      <div class="userInfo">
        <img class="avatar" :src="avatar">
        <p>{{nickName}}</p>
        <progress :percent="percent" active />
        <button type="primary" @click="scan">扫码</button>
      </div>
      <button v-if="flag" class="login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
  </div>
</template>

<script>
// import qcloud from 'wafer2-client-sdk'
import config from './../../config'
import {post, showToast} from './../../util'

export default {
  data () {
    return {
      flag: true,
      avatar: '',
      nickName: '',
      code: ''
    }
  },
  created () {
    this.login()
  },
  computed: {
    percent () {
      const firstDay = new Date(`${new Date().getFullYear()}-01-01`).getTime()
      const lastDay = new Date(`${new Date().getFullYear()}-12-31`).getTime()
      const now = new Date().getTime()
      const day = 1000 * 60 * 60 * 24
      return Math.floor(((now - firstDay) / day) / ((lastDay - firstDay) / day) * 100)
    }
  },
  methods: {
    scan () {
      const openid = JSON.parse(wx.getStorageSync('userInfo')).openid
      wx.scanCode({
        success: res => {
          post(config.bookUrl, {
            openid,
            isbn: res.result
          }).then((resp) => {
            showToast('添加成功')
          })
        }
      })
    },
    getUserInfo (e) {
      console.log('111', e.mp.detail.userInfo)
      let {avatarUrl, city, country, gender, language, nickName, province} = e.mp.detail.userInfo
      this.avatar = avatarUrl
      this.nickName = nickName
      if (this.code) {
        post(config.wxLoginUrl, {
          code: this.code,
          avatarUrl,
          city,
          country,
          gender,
          language,
          nickName,
          province
        }).then((resp) => {
          wx.setStorageSync('userInfo', JSON.stringify(resp.data))
          this.flag = false
        })
      }
    },
    login () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.flag = false
        userInfo = JSON.parse(userInfo)
        this.avatar = userInfo.avatarUrl
        this.nickName = userInfo.nickName
      } else {
        this.flag = true
        wx.login({
          success: res => {
            this.code = res.code
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
.me-container
  position: relative
  width: 100%
  height: 600rpx
  .userInfo
    position: absolute
    top: 50%
    left: 50%
    width: 700rpx
    transform: translate(-50%, -50%)
    text-align: center
    .avatar
      width: 200rpx
      height: 200rpx
      border-radius: 50%
  .login
    position: absolute
    bottom: 0
  button
    margin-top: 20rpx
    background-color: #EA5149
</style>
