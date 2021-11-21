import { createStore } from 'vuex'

export default createStore({
  state: {    
    // 用户信息
    user:{},

    test:0

  },
  mutations: {
    updateUser(state, data) {
      state.user = data
    },
    updateTest(state,data){
      state.test=data
    }
  
    
  },
  actions: {
  },
  modules: {
  }
})
