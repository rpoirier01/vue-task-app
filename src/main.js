import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap';
// import router from './routes'

// createApp(App).mount('#app')

const app = createApp(App);//needed if we do routing
// app.use(router)


app.mount('#app');