<template>
  <v-app>
    <navigation-drawer></navigation-drawer>

    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/about">About</router-link>|
        <router-link to="/routine-check">routine-check</router-link>|
        <router-link to="/routine-add">routine-add</router-link>|
        <router-link to="/routine-edit">routine-edit</router-link>|
        <router-link to="/routine-delete">routine-delete</router-link>
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer.vue";

export default {
  data () {
    return {}
  },
  components: {
    NavigationDrawer
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
