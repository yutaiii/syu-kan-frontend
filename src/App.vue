<template>
  <v-app>
    <Header />

    <div id="app" class="mt-10">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  data () {
    return {}
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
