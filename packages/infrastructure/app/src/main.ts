import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'



import { dependencies } from '@/DependencyInjection'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(dependencies)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })

app.mount('#app')
