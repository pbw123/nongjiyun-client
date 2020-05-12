import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import VideoPlayer from 'vue-video-player'
import BMap from 'BMap'
import App from './App'

Vue.use(VideoPlayer);
Vue.use(ElementUI);
Vue.use(VideoPlayer);
Vue.config.productionTip = true
Vue.prototype.apiServer = 'http://47.101.51.245:7777/'
// Vue.prototype.apiServer = 'http://localhost:7777/'
Vue.prototype.$http = axios
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
