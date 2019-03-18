<template>
  <div class="me-container">
      <div class="userInfo">
        <img class="avatar" :src="avatar">
        <p>{{nickName}}</p>
      </div>
      <button class="login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
  </div>
</template>

<script>
// import qcloud from 'wafer2-client-sdk'
import config from './../../config'
import {post} from '../../util'

export default {
  data () {
    return {
      avatar: '',
      nickName: '',
      code: ''
    }
  },
  created () {
    this.login()
  },
  methods: {
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
          if (resp.data.code === 0) {
            wx.setStorageSync('openid', resp.data.data)
          }
        })
      }
    },
    login () {
      console.log(wx.getStorageSync('openid'))
      wx.login({
        success: res => {
          this.code = res.code
        }
      })
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
    transform: translate(-50%, -50%)
    .avatar
      width: 200rpx
      height: 200rpx
      border-radius: 50%
  .login
    position: absolute
    bottom: 0
</style>
