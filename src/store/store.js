import { createStore } from 'vuex'
import modulesA from './modules/modulesA'
import modulesB from './modules/modulesB'

const store = createStore({
  state () {
    return {
      count: 1,
    }
  },
  getters: {
    globalText: state => {
      return `next global count is ${state.count + 1}`;
    }
  },
  mutations: {
    incrementGlobal (state) {
      state.count++
    },
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('incrementGlobal')
      }, 1000)
    },
  },
  modules:{
    modulesA,
    modulesB
  }
})

export default store;