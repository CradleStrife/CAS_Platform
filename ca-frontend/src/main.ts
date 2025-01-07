import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入 router/index.js
import './style.css'

const app = createApp(App)
app.use(router) // 使用路由实例
app.mount('#app')
