<template>
  <div class="container">
    <div>
      <a href="/"><img src="/static/img/logo.png" class="img-fluid rounded" alt="logo.png" style="max-width: 20%;"></a>
      <h5 class="text-center font-weight-bold">用户注册</h5>
    </div>
    <div class="form-group" style="max-width: 50%;margin-left: 25%;">
      <label>用户名</label>
      <input v-model.trim="username" type="text" class="form-control" placeholder="Username" required>
      <small class="form-text text-muted float-right">用户名必须唯一</small>
      <br>
      <label>密码</label>
      <input v-model.trim="password" v-on="$_checkInput" type="password" class="form-control" placeholder="Password" required>
      <small class="form-text text-muted float-right">长度不小于8位</small>
      <br>
      <label>确认密码</label>
      <input v-model.trim="confirmPassword" v-on="$_checkInput" type="password" class="form-control" placeholder="Confirm Password" required>
      <small class="form-text text-muted float-right">与密码必须一致</small>
      <br>
      <label>用户类型</label>
      <select v-model="type" class="custom-select">
        <option value="" disabled>User Type</option>
        <option value="user">用户</option>
        <option value="tracker">监控员</option>
        <!-- <option value="admin">管理员</option> -->
      </select>
      <small class="form-text text-muted float-right">决定了使用权限</small>
      <br>
      <br>
      <label>注册码</label>
      <input v-model.trim="registCode" type="text" class="form-control" placeholder="Register Code">
      <small class="form-text text-muted float-right">由管理员提供</small>
      <br>
      <label>邮箱</label>
      <input v-model.trim="email" type="email" class="form-control" placeholder="Email">
      <small class="form-text text-muted float-right">用于找回密码和事件通知</small>
      <br>
      <label>手机</label>
      <input v-model.trim="tel" type="tel" class="form-control" placeholder="Telephone">
      <small class="form-text text-muted float-right">用于找回密码和事件通知</small>
      <br>
      <label>其他信息</label>
      <input v-model.trim="info" type="text" class="form-control" placeholder="Information">
      <small class="form-text text-muted float-right">用于账户信息记录</small>
      <br>
      <regist-item></regist-item>
      <br>
      <div class="float-right mb-2">
        <button :class="{disabled:isDisabled}" @click="$_regist" class="btn btn-primary">{{registButton}}</button>&nbsp;&nbsp;
        <router-link to="/" class="btn btn-light" role="button">取消</router-link>
      </div>
      <small class="form-text text-danger float-left">{{errorInfo}}</small>
    </div>
  </div>
</template>

<script>
import userRegistItem from './userRegistItem'
import crypto from 'crypto'
export default {
  data() {
    return {
      registButton: '注册',
      isDisabled: false,
      errorInfo: '',
      username: '',
      password: '',
      confirmPassword: '',
      type: 'user',
      registCode: '',
      email: '',
      tel: '',
      info: ''
    }
  },
  components: { 'regist-item': userRegistItem },
  methods: {
    $_regist() {
      this.errorInfo = ''
      if (!this.username) {
        this.errorInfo = '请输入用户名'
        return
      }
      if (!this.password) {
        this.errorInfo = '请输入密码'
        return
      }
      if (!this.type) {
        this.errorInfo = '请选择用户类型'
        return
      }
      this.registButton = '注册中...'
      this.isDisabled = true
      let hash = crypto.createHmac('md5', 'SmartSpace')
      let cryptoPassword = hash.update(this.password).digest('hex')
      let registData = {
        type: 'user',
        id: this.username,
        code: cryptoPassword
      }
      if (this.phone) registData.phone = this.phone
      if (this.email) registData.email = this.email
      if (this.type) registData.privilege = this.type
      if (this.regist_code) registData.regist_code = this.regist_code
      if (this.info) registData.info = this.info
      axios({
        // eslint-disable-line
        method: 'post',
        url: '/api/user/regist',
        data: { regist: registData },
        timeout: 10000
      })
        .then(result => {
          this.registButton = '注册'
          this.isDisabled = false
          if (result.data.general.type === 'regist') {
            if (result.data.general.state) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  username: this.username,
                  password: cryptoPassword
                })
              )
              localStorage.setItem(
                'configure',
                JSON.stringify(result.data.general.message)
              )
              this.$router.push('/')
            } else if (result.data.general.message === 'idExisted') {
              this.errorInfo = '此用户名已存在'
            } else {
              this.errorInfo = '未知错误'
            }
          } else {
            this.errorInfo = '未知错误'
          }
        })
        .catch(err => {
          document.writeln(err)
          document.close()
        })
    }
  },
  computed: {
    $_checkInput() {
      if (this.password && this.password.length < 8) {
        this.errorInfo = '输入密码长度太短'
        return
      }
      if (this.password != this.confirmPassword) {
        this.errorInfo = '两次输入密码不一致'
        return
      }
      this.errorInfo = ''
    }
  }
}
</script>

<style scoped>
</style>
