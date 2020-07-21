import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import LoginPage from './components/Login.vue'
import Riwayat from './components/RiwayatPeminjaman.vue'
import AdminMainPage from './components/AdminMainPage.vue'
import Loggout from './components/Loggout.vue'
import {store} from './store/store'

Vue.use(VueRouter);

const routes = [
  { path: '/inventaris/riwayat/', component:  Riwayat, meta: {requiresAuth: true}},
  { path: '/inventaris', component:  AdminMainPage, meta: {requiresAuth: true}},
  { path: '/login', component:  LoginPage, meta: {requiresVisitor: true}},
  { path: '/loggout', component:  Loggout, meta: {requiresAuth: true}}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)){
		if(!store.getters.loggedIn){
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}else{
			next();
		}
	}else if(to.matched.some(record => record.meta.requiresVisitor)){
		if(store.getters.loggedIn){
			next({
				path: '/inventaris',
				query: { redirect: to.fullPath }
			})
		}else{
			next();
		}
	}
	else{
		next();
	}
})

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')
