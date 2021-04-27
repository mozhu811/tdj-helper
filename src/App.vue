<template>
  <v-app>
    <v-app-bar
      app
      color='indigo darken-2'
      dark
      prominent
      src='https://cruii.io/upload/2021/04/IMG_5108%203-8f1a622452fe4295b91a12bb3ed7482a.jpg'
    >
      <v-app-bar-nav-icon @click="drawerToggle"></v-app-bar-nav-icon>

      <template v-slot:img='{ props }'>
        <v-img
          v-bind='props'
          gradient='to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)'
        ></v-img>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <span style='font-family: xingticaoshu,serif; font-size: 2rem'>{{ title }}</span>
          </v-list-item-title>
<!--          <v-list-item-subtitle>-->
<!--          </v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="active"
          color='primary'
        >
          <v-list-item v-for='(item, index) in items' :key='index' :to='item.path'>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template #append>
        <div style='display: flex; justify-content: center'>
          <v-chip
            class='mb-2'
            color='pink'
            label
            small
          >
            <v-icon left color='white'>
              mdi-laptop
            </v-icon>
            <span style='color: white'>Powered By: @Cruii</span>
          </v-chip>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <div class="page_wrapper"><router-view /></div>
    </v-main>
  </v-app>
</template>

<script>
import ClientCheck from '@/assets/client-check'
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    active: null,
    title: '天地劫小助手',
    items: [
      {
        name: '魂石评估',
        path: '/grade',
        icon: 'mdi-certificate'
      },
      {
        name: '魂石预测',
        path: '/prediction',
        icon: 'mdi-wizard-hat'
      }
    ]
  }),
  created () {
    this.drawer = !ClientCheck.isMobile()
  },
  methods: {
    drawerToggle () {
      this.drawer = !this.drawer
    }
  }
}
</script>
