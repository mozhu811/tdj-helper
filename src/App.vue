<template>
  <v-app>
    <v-app-bar
      color='indigo darken-2'
      dark
      height='80'
      shrink-on-scroll
      src='https://cruii.io/upload/2021/04/IMG_5108%203-8f1a622452fe4295b91a12bb3ed7482a.jpg'
      fade-img-on-scroll
      scroll-target='#scrolling-techniques'
    >
      <template v-slot:img='{ props }'>
        <v-img
          v-bind='props'
          gradient='to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)'
        ></v-img>
      </template>

      <!--      <v-app-bar-nav-icon ></v-app-bar-nav-icon>-->
      <v-toolbar-title>
        <span style='font-family: xingticaoshu,serif; font-weight: bold; font-size: 30px'>{{ title }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--      <v-btn icon>-->
      <!--        <v-icon>mdi-magnify</v-icon>-->
      <!--      </v-btn>-->

      <!--      <v-btn icon>-->
      <!--        <v-icon>mdi-heart</v-icon>-->
      <!--      </v-btn>-->
      <template v-slot:extension>
        <v-tabs
          v-model='tab'
          centered
          slider-color='yellow'
        >
          <v-tab
            v-for='item in items'
            :key='item'
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-sheet id='scrolling-techniques' class='overflow-y-auto'
               max-height='800'>
        <v-container style='height: 1000px'>
          <v-tabs-items v-model='tab'>
            <v-tab-item
              v-for='item in items'
              :key='item'
            >
              <StoneGrade v-if='tab === 0' />
              <StonePrediction v-if='tab === 1' />
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import StoneGrade from './components/StoneGrade'
import StonePrediction from '@/components/StonePrediction'

export default {
  name: 'App',

  components: {
    StoneGrade,
    StonePrediction
  },

  data: () => ({
    tab: 0,
    title: '天地劫小助手',
    items: [
      '魂石评估', '魂石预测', '待添加'
    ]
  })
}
</script>
