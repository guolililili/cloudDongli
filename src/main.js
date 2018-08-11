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