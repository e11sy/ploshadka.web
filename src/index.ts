import { createApp } from 'vue'
import App from './App.vue'
import router from '@/application/router/index'

const app = createApp(App)
app.use(router);

app.mount('#app');