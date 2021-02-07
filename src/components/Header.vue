<template>
  <div class="ma-0 pa-0">
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
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
  }),
}
</script>

<style scoped>
.app-bar-title {
  font-size: 30px;
  font-weight: bold;
}
</style>