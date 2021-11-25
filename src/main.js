import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/index"
import element from "./elementui/index"
import svgIcons from "./elementui/svgIcon/index"


import store from "./store/index"

import axios from 'axios'
import VueAxios from 'vue-axios'

import http from "./http/index"

import "vue-virtual-scroller/dist/vue-virtual-scroller.css" // 引入它的 css
import VueVirtualScroller from "vue-virtual-scroller" // 引入它

const app = createApp(App)
app.config.globalProperties.http=http

app.use(element).use(svgIcons).use(store).use(VueAxios, axios).use(router).use(VueVirtualScroller).mount('#app')
