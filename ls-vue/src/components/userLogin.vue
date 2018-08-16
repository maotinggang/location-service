<template>
  <div class="container">
    <div class="text-center">
      <a href="/"><img src="/static/img/logo.png" class="img-fluid rounded" alt="logo.png"></a>
      <br>
      <h5 class="text-center font-weight-bold">室内外一体化位置服务系统</h5>
    </div>
    <div class="form-group" id="login">
      <label for="username">用户名</label>
      <input v-model.trim="username" type="text" class="form-control" id="username" placeholder="Username" required>
      <small v-if="isUsername" class="float-left text-danger">未注册用户</small>
      <br>
      <label for="password">密码</label>
      <input v-model.trim="password" @keyup.enter="$_login" type="password" class="form-control" name="password" id="password" placeholder="Password">
      <small v-if="isPassword" class="float-left text-danger">密码错误</small>
      <br>
      <small class="float-left text-danger">{{errorInfo}}</small>
      <div class="float-right">
        <router-link to="/userRegist">
          <small>立即注册</small>
        </router-link>&nbsp;&nbsp;
        <router-link to="/userFindPassword">
          <small>忘记密码</small>
        </router-link>
        <br>
        <br>
        <button :class="{disabled:isDisabled}" @click="$_login" class="btn btn-primary float-right" style="width: 100%">{{loginButton}}</button>
      </div>
    </div>
    <div class=" fixed-bottom text-center text-muted" id="company-info">
      <small>
        <a href="http://www.smartspace.com.cn/index.php?id=aboutus" target="_blank">关于我们</a>&nbsp;&nbsp;
        <a href="http://www.smartspace.com.cn/index.php?id=contactus" target="_blank">联系我们</a>
        <p>北京智汇空间科技有限公司</p>
      </small>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto'
export default {
  data() {
    return {
      errorInfo: '',
      isError: false,
      username: '',
      isUsername: false,
      password: '',
      isPassword: false,
      isDisabled: false,
      loginButton: '登录'
    }
  },
  methods: {
    $_login() {
      if (!this.username || !this.password) {
        this.errorInfo = '请输入用户名和密码'
        return
      } else {
        this.errorInfo = ''
      }
      this.isDisabled = true
      this.loginButton = '登录中...'
      let hash = crypto.createHmac('sha1', 'SmartSpace')
      let cryptoPassword = hash.update(this.password).digest('base64')
      let sendData = {
        user: {
          type: 'user',
          id: this.username,
          code: cryptoPassword
        }
      }
      axios({
        // eslint-disable-line
        method: 'post',
        url: '/api/user/login',
        data: sendData,
        timeout: 10000
      })
        .then(result => {
          this.loginButton = '登录'
          this.isDisabled = false
          if (result.data.general.type === 'login') {
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
            } else if (result.data.general.message === 'userIdUnkown') {
              this.isUsername = true
            } else if (result.data.general.message === 'codeError') {
              this.isPassword = true
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 40%;
}

#login {
  max-width: 60%;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
#company-info {
  z-index: -1;
}
</style>
