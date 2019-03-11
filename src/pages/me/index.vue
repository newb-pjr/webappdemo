<template>
  <div>me
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from './../../config'

export default {
  created () {
    this.login()
  },
  methods: {
    getUserInfo (e) {
      console.log('111', e.mp.detail.userInfo)
    },
    login () {
      qcloud.setLoginUrl(config.loginUrl)
      const session = false
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            this.setData({ userInfo: res, logged: true })
            console.log(res)
          },
          fail: err => { console.error('222', err) } })
      } else {
        console.log(123)
        qcloud.login({
          success: res => {
            console.log(res)
            this.setData({ userInfo: res, logged: true })
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
