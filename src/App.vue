<template>
  <Global/>
  <hr/>
  <FeatureA />
    <hr/>
  <FeatureB />
</template>

<script>
import FeatureA from './components/FeatureA.vue'
import FeatureB from './components/FeatureB.vue'
import Global from './components/Global.vue'

export default {
  name: 'App',
  components: {
    Global,
    FeatureA,
    FeatureB
  },
}
</script>

<style>

</style>
