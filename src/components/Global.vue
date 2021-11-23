<template>
  <div>
    <h4>Global</h4>
    <div>
      <div>counts : {{ count }}</div>
      <div>this.$store.counts : {{ storeCount }}</div>
      <div>{{ globalText }}</div>
      <div>
        <h5 style="margin-bottom:0px;">use this.$store</h5>
        <button @click="commitAdd">++ Global</button>
        <button @click="dispatchGlobal">dispatch Global</button>
      </div>
      <div>
        <h5 style="margin-bottom:0px;">use map hook</h5>
        <button @click="add">++ Global</button>
        <button @click="actionGlobal">dispatch Global</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "Global",
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["globalText"]),
    storeCount() {
      return this.$store.state.count;
    },
  },
  methods: {
    ...mapMutations({ add: "incrementGlobal" }),
    ...mapActions({ actionGlobal: "incrementAsync" }),
    commitAdd() {
      this.$store.commit("incrementGlobal");
    },
    dispatchGlobal() {
      this.$store.dispatch("incrementAsync");
    },
    test(){
      const info =   this.$store.state.count;
      this.input = info;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
