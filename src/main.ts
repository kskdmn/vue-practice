import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'
import { useThemeStore } from './stores/theme'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faInfoCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faInfoCircle, faSun, faMoon)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)

// Initialize theme store
const themeStore = useThemeStore()
themeStore.init()

app.mount('#app')
