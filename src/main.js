import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@/assets/css/global.css'
import '@/styles/index.less'
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
