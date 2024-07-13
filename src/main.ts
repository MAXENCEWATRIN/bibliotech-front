import './assets/tailwind.css';
//pour le webSocket
import './global-polyfill';
import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css';
//Local storage
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import { connectWebSocket, disconnectWebSocket } from './service/websocket-book'
import { useBookStore } from './store/bookStore'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia);
app.use(router);

const bookStore = useBookStore()
connectWebSocket();

app.mount('#app')

window.addEventListener('beforeunload', () => {
    disconnectWebSocket();
});
