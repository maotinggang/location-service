<template>
  <div>
    <display-map :dataList="dataList" :dataOneMap="dataOneMap" :isMarkAll="false"></display-map>

    <nav class="navbar navbar-expand-sm navbar-dark bg-info">
      <a class="navbar-brand" href="/">
        <h3>SmartSpace</h3>
      </a>
      <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">实时显示</a>
            <div class="dropdown-menu">
              <h6 class="dropdown-header">显示状态</h6>
              <a class="dropdown-item small" href="#">全部</a>
              <a class="dropdown-item small" data-toggle="modal" href="#" data-target="#comSelcet">自定义</a>
              <a @click="$_display" class="dropdown-item small" href="#">{{isDisplay}}</a>
              <div class="dropdown-divider"></div>
              <h6 class="dropdown-header">交通工具</h6>
              <a class="dropdown-item small" href="#">飞机</a>
              <a class="dropdown-item small" href="#">无人机</a>
              <a class="dropdown-item small" href="#">加油车</a>
              <a class="dropdown-item small" href="#">消防车</a>
              <a class="dropdown-item small" href="#">工程车</a>
              <a class="dropdown-item small" href="#">拖车</a>
              <a class="dropdown-item small" href="#">货车</a>
              <a class="dropdown-item small" href="#">叉车</a>
              <a class="dropdown-item small" href="#">大巴</a>
              <a class="dropdown-item small" href="#">摆渡车</a>
              <a class="dropdown-item small" href="#">电动车</a>
              <a class="dropdown-item small" href="#">自行车</a>
              <a class="dropdown-item small" href="#">手推车</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">记录统计</a>
            <div class="dropdown-menu">
              <a class="dropdown-item small" href="#">历史查询</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">用户管理</a>
            <div class="dropdown-menu">
              <h5 class="dropdown-header">{{currentUser? currentUser.username:''}}</h5>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item small" href="/#/userLogin">登录</a>
              <a @click="$_logout" href="#" class="dropdown-item small">退出</a>
              <a class="dropdown-item small" href="/#/userRegist">注册</a>
              <a @click="$_isLogin('userSet')" class="dropdown-item small" href="#">设置</a>
              <div class="dropdown-divider"></div>
              <a @click="$_isLogin('manageAccount')" class="dropdown-item small" href="#">账号管理</a>
              <a @click="$_isLogin('manageDevice')" class="dropdown-item small" href="#">设备管理</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input v-model="searchContent" class="form-control mr-sm-2" type="text" placeholder="Search">
          <button @click="$_search" :class="{disabled:isSearch}" class="btn btn-outline-light my-2 my-sm-0" type="button" data-toggle="tooltip" data-placement="bottom" title="格式()" id="search">{{search}}</button>
        </form>
      </div>
    </nav>
    <display v-show="isDisplay=='关闭列表'"></display>
    <display-list-user></display-list-user>
  </div>
</template>

<script>
import displayMap from './displayMap'
import displayListUser from './displayListUser'
import display from './display'
export default {
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user')),
      userConfigure: JSON.parse(localStorage.getItem('configure')),
      search: '搜索',
      isSearch: false,
      searchContent: '',
      isDisplay: '关闭列表',
      dataList: [],
      dataOneMap: {}
    }
  },
  components: {
    'display-map': displayMap,
    'display-list-user': displayListUser,
    display: display
  },
  methods: {
    $_logout() {
      localStorage.removeItem('user')
      localStorage.removeItem('configure')
      this.currentUser = ''
      this.userConfigure = ''
    },
    $_search() {
      this.isSearch = true
      this.search = '搜索中'
    },
    $_isLogin(page) {
      if (this.currentUser) {
        this.$router.push(page)
      } else {
        alert('请登录后再进行此操作！！！')
      }
    },
    $_display() {
      if (this.isDisplay == '打开列表') this.isDisplay = '关闭列表'
      else this.isDisplay = '打开列表'
    }
  }
}
</script>

<style scoped>
</style>
