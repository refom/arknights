import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Plugins
import icons from '@/plugins/icons'
import utils from '@/plugins/utils'

app.use(icons)
app.use(utils)

app.mount('#app')
