<template>
  <v-app>
    <v-app-bar
      app
      color='indigo darken-2'
      dark
      src='https://cruii.io/upload/2021/04/IMG_5108%203-8f1a622452fe4295b91a12bb3ed7482a.jpg'
    >
      <template v-slot:img='{ props }'>
        <v-img
          v-bind='props'
          gradient='to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)'
        ></v-img>
      </template>
    </v-app-bar>

    <v-main>
      <div class="page_wrapper"><router-view /></div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    tab: 0,
    title: '天地劫小助手',
    items: [
      {
        name: '魂石评估',
        path: '/grade'
      },
      {
        name: '魂石预测',
        path: '/prediction'
      }
    ]
  })
}
</script>
