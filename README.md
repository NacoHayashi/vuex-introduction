 vuex 小解說
==

### 關於安裝
請參見[官網](https://vuex.vuejs.org/zh/installation.html#%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BD-cdn-%E5%BC%95%E7%94%A8)

### Vuex 核心
![](https://i.imgur.com/SRYvTTf.png)


- state:存取的資料
- view :讓state的資料呈現在畫面上
- actions : 操作去變化state的資料

### Vue 的組成及流向
![](https://i.imgur.com/B2mSmCb.png)


- State : 有點像vue檔的data，只是資料庫
  - 在vue檔的computed 可以用mapState取得資料
  - 用store讀取：this.$store.state.state資料名
- Getter : 有點像vue檔的computed，拿著state的資料做計算完再給你
  - 在vue檔的computed 可以用mapGetters取得資料
  - 用store讀取：this.$store.getters.getter的名稱
- Mutation : 有點像vue檔的methods，計算完存進state
  - 它是同步函數
  - Mutations名稱就有點像註冊一個事件
  - 在vue檔中執行它用this.$store.commit('Mutations名稱')
  - 可以放在methods裏用mapMutations，this.Mutations名稱就等於宣告一個methods執行時等於執行this.$store.commit('Mutations名稱')


- Action : 很像Mutations但它是處理異步的函數
  - 它跟Mutations一樣是個函數，但它不能直接更改state, 它必須叫mutations去幫他改state
  - Action 傳進來的context裡面包含了commit、state、getters，所以可以解構使用
  - 在Vue檔使用是this.$store.dispatch('Action名稱')
  - 跟Mutations一樣可以用mapActions放在methods裡
  - Action 可以return 一個promise，也能搭配async await或是在action裡執行別的action
 ```
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```


### Module
我們很常有很多不同頁面需要存著各種資料
module就是讓我們可以個別清楚的管理他們

假設我們有ABC三個不同功能頁面
那就可以拆分成三個store module 每一個module都有自己的state、getters、mutations、actions

默認情況下getters,mutations,actions 都是註冊在全域
所以在外面使用的時候this.$store.getters就可以拿到module裡的function
module裡的function 可以拿到屬於自己模組的東西跟全域的資料
像是 getters 可以拿到自己store的state，也能用rootState拿到全域的state資料
```
const moduleA = {
  ...
  actions: {
    //這裡的rootState就是指主要的根state
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

如果想要自己管自己的，那可以加個namespaced: true，設定命名空間，等於這個module有自己的一個小區域
如果沒有加上，你的module等於是全域的拿取，
但這個壞處是你在其他地方要叫它的資料必須寫出路徑
像是 this.$store.getters['aiOptStore/briefs']

在dispatch跟commit 的時候也是要寫全路徑
如果在module裡function中需要使用到另一個全域的函數，可以多加第三個參數 {root:true}
```
actions: {
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter' 指定某個模塊裡的getter function
        rootGetters.someGetter // -> 'someGetter' 用全域的getter

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
```
當然如果你module層級太多，寫全路徑會煩死
所以也可以把路徑先提出來
像是這個mapActions
 ```
...mapActions('some/nested/module', [
    'foo', 
    'bar' 
  ])
```