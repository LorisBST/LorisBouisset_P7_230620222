import { createApp } from 'vue'
import router from "./router"
import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'


import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


const app = createApp(App)
app.component('BootstrapIcon', BootstrapIcon);
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')
