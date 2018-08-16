<template>
  <div class="container">
    <div>
      <img src="/static/img/logo.png" class="img-fluid rounded" alt="logo.png" style="max-width: 20%;">
      <h5 class="text-center font-weight-bold">找回密码</h5>
    </div>
    <div class="form-group" style="max-width: 50%;margin-left: 25%;">
      <label for="username">用户名</label>
      <input type="text" class="form-control" name="username" id="username" aria-describedby="usernameHelp" placeholder="Username" required>
      <small id="usernameHelp" class="form-text text-muted float-right">用户名必须填写</small>
      <br>
      <label for="email">邮箱</label>
      <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email">
      <small id="emailHelp" class="form-text text-muted float-right">注册邮件接收验证码</small>
      <br>
      <label for="tel">手机</label>
      <input type="tel" class="form-control" name="tel" id="tel" aria-describedby="telHelp" placeholder="Telephone">
      <small id="telHelp" class="form-text text-muted float-right">注册手机接收验证码</small>
      <br>
      <div class="float-right mt-4">
        <input name="register" id="register" class="btn btn-primary" type="submit" value="确定">&nbsp;&nbsp;
        <router-link to="/" class="btn btn-light" role="button">取消</router-link>
      </div>
    </div>
    <div class="fixed-bottom text-center text-muted ">
      <small>
        <a href="http://www.smartspace.com.cn/index.php?id=aboutus" target="_blank">关于我们</a>&nbsp;&nbsp;
        <a href="http://www.smartspace.com.cn/index.php?id=contactus" target="_blank">联系我们</a>
        <p>北京智汇空间科技有限公司</p>
      </small>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
