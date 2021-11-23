<template>
  <div>
    <h4>FeatureB</h4>
    <div>
      <div>this current store module is {{moduleName}}</div>
      <div>this.$store.state.count : {{ count }}</div>
      <div>this.$store.getters.modulesBCount {{ modulesBCount }}</div>
      <button @click="add">++ modulesB</button>
      <button @click="dispatchGlobal">dispatch modulesB</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureB",
  computed: {
    moduleName() {
      return this.$store.state.modulesB.moduleName;
    },
    count() {
      return this.$store.state.count;
    },
    modulesBCount() {
      return this.$store.getters.modulesBCount;
    },
  },
  methods: {
    add() {
      this.$store.commit("incrementmodulesB");
    },
    asyncB() {
      this.$store.dispatch("incrementmodulesB");
    },
  },
};
</script>

<style scoped></style>
