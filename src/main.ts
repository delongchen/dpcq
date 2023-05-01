import {createApp} from 'vue'
import './style.less'
import App from './App.vue'
import {router} from "./router";
import {td} from "./plugin/td";

const app = createApp(App)

app.use(router)
app.use(td)
import './assets/theme.css'

app.mount('#app')
