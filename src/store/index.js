import { createStore } from 'vuex'

export default createStore({
  state: {    
    // 用户信息
    user:{},

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
