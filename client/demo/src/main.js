import Vue from 'vue'
import router from './router'
import store from './store'
import {mapMutations} from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Indicator } from 'mint-ui'
import App from './App.vue'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '//' + document.domain : 'http://localhost:3000'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  Indicator.open()
  // 将store中的token放到请求头中
  if (store.state.token) {
    config.headers.Authorization = `token ${store.state.token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  Indicator.close()
  return res
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.commit('LOGIN_OUT'); //可能是token过期，清除它
        router.replace({ //跳转到登录页面
          path: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    }
  }
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
