import { createApp } from 'vue'
import App from './App.vue'
import element from "./elementui/index"

import axios from 'axios'
import VueAxios from 'vue-axios'

import http from "./http/index"
const app = createApp(App)
app.config.globalProperties.http=http


app.use(element).use(VueAxios, axios).mount('#app')
