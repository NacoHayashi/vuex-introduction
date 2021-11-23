
const modulesB = {
  state() {
    return {
      count: 1,
      moduleName:'B'
    }
  },
  getters: {
    modulesBCount: (state) => {
      return state.count;
    },
    modulesBText: (state, getters, rootState) => {
      return `double modulesB is ${state.count * 2}, modulesB add global is ${rootState.count + state.count}`;
    }
  },
  mutations: {
    incrementmodulesB(state) {
      state.count++
    },
  },
  actions: {
    incrementAsyncB({ commit }) {
      setTimeout(() => {
        commit('incrementmodulesB')
      }, 1000)
    }
  },
}

export default modulesB;
