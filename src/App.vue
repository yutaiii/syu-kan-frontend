<template>
  <v-app>
    <v-card
      class="overflow-hidden"
    >
      <v-app-bar
        color="orange"
        dense
        dark
      >
        <v-app-bar-title class="ml-2 app-bar-title">SYU-KAN</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="mr-2"
        ></v-app-bar-nav-icon>
      </v-app-bar>

    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
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
export default {
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
    }
  },
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

.app-bar-title {
  font-size: 30px;
  font-weight: bold;
}
</style>
