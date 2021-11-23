<template>
  <div>
    <h4>FeatureA</h4>
    <div>
      <div>counts : {{ count }}</div>
      <div> {{modulesAText}}</div>
      <button @click="add">++ modulesA</button>
      <button @click="dispatchGlobal">dispatch modulesA</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions,mapMutations } from "vuex";

export default {
  name: 'FeatureA',
  computed: {
    ...mapState("modulesA",['count']),
    ...mapGetters("modulesA",["modulesAText"])
  },
  methods:{
    ...mapMutations({add:'modulesA/incrementModulesA',}),
    ...mapActions({dispatchGlobal:'modulesA/incrementAsync'})
  }
}
</script>

<style scoped>
</style>
