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
            SYU-KAN
          </v-list-item-title>
          <v-list-item-subtitle>
            メニュー
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
          :to="item.path"
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
      { title: 'Home', icon: 'mdi-view-dashboard', path: '/' },
      { title: 'About', icon: 'mdi-help-box', path: '/about' },
      { title: '習慣日次チェック', icon: 'mdi-checkbox-marked', path: '/routine-check' },
      { title: '習慣登録', icon: 'mdi-plus-box', path: '/routine-add' },
      { title: '習慣編集', icon: 'mdi-pencil-box', path: '/routine-edit' },
      { title: '習慣削除', icon: 'mdi-delete', path: '/routine-delete' },
      { title: 'ログアウト', icon: 'mdi-login', path: '/logout' },
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