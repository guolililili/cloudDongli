import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(iView);
Vue.prototype.$ajax = axios;

// const RouterConfig = {
//     mode: 'history',
//     routes: router
// };
// const Routers = new VueRouter(RouterConfig);

// Routers.beforeEach((to, from, next) => {
//     iView.LoadingBar.start();
//     Util.title(to.meta.title);
//     //未登录 访问除登录页外别的页面
//     if (!store.getters.isLogin && to.name !== 'login') {
//         Routers.push({name: 'login'});
//     }
//     //已登录 访问登录界面
//     if (store.getters.isLogin && to.name == 'login') {
//         Routers.push({name: 'home'});
//     }
//     next();
// });

// Routers.afrouterrerEach(() => {
//     iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        this.$store.commit('updateMenulist');
    }
});