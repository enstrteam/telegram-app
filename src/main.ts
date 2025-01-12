import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// Функция для динамической загрузки Telegram Web App SDK
function loadTelegramSDK(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.Telegram && window.Telegram.WebApp) {
      resolve(window.Telegram.WebApp);  // Если SDK уже загружен, сразу резолвим
    } else {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;

      script.onload = () => {
        resolve(window.Telegram.WebApp);  // Резолвим, когда SDK загрузится
      };
      script.onerror = (error) => {
        reject(new Error('Failed to load Telegram WebApp SDK'));
      };

      // Добавляем скрипт в <head>
      document.head.appendChild(script);
    }
  });
}

// Загружаем Telegram SDK
loadTelegramSDK()
  .then(() => {
    console.log('Telegram SDK loaded and initialized.');
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
  })
  .catch((error) => {
    console.error('Error loading Telegram SDK:', error);
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
  });
