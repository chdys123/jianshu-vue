import { createStore } from 'vuex'

export default createStore({
  state: {
    // 登录状态
    
    // 用户信息
    user:{}
  },
  mutations: {
    updateUser(state, data) {
      state.user = data
    },
    
  },
  actions: {
  },
  modules: {
  }
})
