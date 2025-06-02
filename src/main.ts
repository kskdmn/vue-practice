import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faInfoCircle)

const app = createApp(App)
app.use(createPinia()).use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
