<template>
	<div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" placeholder="请输入用户名" v-model="username"></input>
        </div>
         <span class="g-form-error">{{ userErrors.textError }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" placeholder="请输入密码" v-model="password"></input>
        </div>
        <span class="g-form-error">{{ passwordErrors.textError }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="logBtn">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>
<script>
import dialog from './base/dialog'
export default {
  data () {
    return {
      username: '',
      password: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let status,textError
      if(!/@/g.test(this.username)){
        status = false
        textError = '输入字符不包含@'
      }else{
        status = true
        textError = ''
      }
      if(!this.userFlag){
        textError = ''
        this.userFlag = true
      }
      return {
        status,
        textError
      }
    },
    passwordErrors () {
      let status,textError
      if(!/^\w{6,}$/g.test(this.password)){
        status = false
        textError = '密码不能少于6位'
      }else{
        status = true
        textError = ''
      }
      if(!this.passwordFlag){
        textError = ''
        this.passwordFlag = true
      }
      return {
        status,
        textError
      }
    }
  },
	methods: {
    logBtn () {
      if(this.userErrors.status && this.passwordErrors.status){
        this.errorText = ''
        this.$http.post('api/login',{username:this.username,password:this.password})
        .then((resp) => {
          this.$emit('has-login',resp.data)
        },(err) => {
          console.log(err)
        })
      }else{
        this.errorText = 'error'
      }
    }
  }
}
</script>
<style>
	
</style>