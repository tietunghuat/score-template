import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import 'vue3-carousel/dist/carousel.css'
import Cropper from 'cropperjs'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
