import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // token刷新页面时可从sessionStorage中获取值
  token: window.sessionStorage.getItem('token')
}
const mutations = {
  // 登录时保存传回的token值
  LOGIN (state, value) {
    state.token = value
    window.sessionStorage.setItem('token', value)
  },
  // 登出时清空token值
  LOGOUT (state) {
    state.token = ''
    window.sessionStorage.removeItem('token')
  }
}

const actions = {}

const getters = {
  
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})