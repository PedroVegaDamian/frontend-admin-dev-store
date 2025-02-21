import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import './main.css'

import App from './App.vue'
import router from './shared/router'

const app = createApp(App)

app.use(Quasar, { lang: quasarLang })
app.use(createPinia())
app.use(router)

app.mount('#app')
