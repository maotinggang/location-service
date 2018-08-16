import Vue from 'vue'
import Router from 'vue-router'
import userLogin from '@/components/userLogin'
import userRegist from '@/components/userRegist'
import userFindPassword from '@/components/userFindPassword'
import index from '@/components/index'
import manageAccount from '@/components/manageAccount'
import manageDevice from '@/components/manageDevice'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/userRegist',
      name: 'userRegist',
      component: userRegist
    },
    {
      path: '/userFindPassword',
      name: 'userFindPassword',
      component: userFindPassword
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/manageAccount',
      name: 'manageAccount',
      component: manageAccount
    },
    {
      path: '/manageDevice',
      name: 'manageDevice',
      component: manageDevice
    }
  ]
})
