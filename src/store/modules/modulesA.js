
const modulesA = {
  namespaced: true,
  state () {
    return {
      count: 1,
    }
  },
  getters: {
    modulesAText: (state, getters, rootState) => {
      return `double modulesA is ${state.count*2}, modulesA add global is ${rootState.count + state.count}`;
    }
  },
  mutations: {
    incrementModulesA(state) {
      state.count++
    },
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('incrementModulesA')
      }, 1000)
    }
  },
}

export default modulesA;
