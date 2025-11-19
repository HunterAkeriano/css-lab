import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router, i18n } from '@/app/providers'
import { App } from '@/app'

import '@/app/styles/index.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')