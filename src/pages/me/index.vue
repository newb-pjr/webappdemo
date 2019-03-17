<template>
  <div>me
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
  </div>
</template>

<script>
// import qcloud from 'wafer2-client-sdk'
import config from './../../config'
import {post} from '../../util'

export default {
  data () {
    return {
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
          this.code = resp
        })
      }
    },
    login () {
      wx.login({
        success: res => {
          this.code = res.code
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
