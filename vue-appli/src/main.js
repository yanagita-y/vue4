import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

Vue.config.productionTip = false

// export 
const firebaseConfig = {
  apiKey: "AIzaSyAW43W74yhGfWI-Owya1YxczF9YQL8szYk",
  authDomain: "vue4-1.firebaseapp.com",
  projectId: "vue4-1",
  storageBucket: "vue4-1.appspot.com",
  messagingSenderId: "84933460362",
  appId: "1:84933460362:web:a6ed3d284cefefa50fc873"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')