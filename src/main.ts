import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import VueCarousel from 'vue-carousel';
import VueCarouselWrapper from '@/component/atom/VueCarouselWrapper.vue';
import VimeoContainer from '@/component/atom/VimeoContainer.vue';

import InfiniteLoading from 'vue-infinite-loading';
import VueSnackbar from 'vue-snack';
import 'vue-snack/dist/vue-snack.min.css';
import { CustomVuePlugin } from '@/util';
import VueI18n from 'vue-i18n';

import TinySpinner from '@/component/atom/TinySpinner.vue';
import RouterLinkExt from '@/component/atom/RouterLinkExt.vue';
import DisableDbClickButton from '@/component/atom/DisableDbClickButton.vue';
import Navigation from '@/component/view/navigation/Navigation.vue';
import SnackbarCommit from '@/component/atom/SnackbarCommit.vue';

import Vuelidate from 'vuelidate';
import Modal from '@/component/atom/Modal.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

/** font-awesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/** native Javascript extensions */
import { defArr, defObj } from '@/ext';
defArr();
defObj();

/**
 * loading custom components to global.
 *
 * @note removing bug of production build.
 * @see https://github.com/vuejs/vue-cli/issues/4065#issuecomment-496267589
 * i guess this bug is caused by minifying process by Webpack.
 */
Vue.component((Navigation as any).options.name, Navigation);
Vue.component((Modal as any).options.name, Modal);
Vue.component((TinySpinner as any).options.name, TinySpinner);
Vue.component((RouterLinkExt as any).options.name, RouterLinkExt);
Vue.component((DisableDbClickButton as any).options.name, DisableDbClickButton);
Vue.component((VueCarouselWrapper as any).options.name, VueCarouselWrapper);
Vue.component((VimeoContainer as any).options.name, VimeoContainer);
Vue.component((SnackbarCommit as any).options.name, SnackbarCommit);
Vue.component('loading', Loading);
library.add(faTimes, faTimesCircle, faEdit, faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/**
 * load libs.
 */
Vue.use(VueCarousel);
Vue.use(InfiniteLoading);
Vue.use(Vuelidate);
Vue.use(CustomVuePlugin);
Vue.use(VueSnackbar, { position: 'bottom', time: 3000 });
Vue.use(VueI18n);

Vue.config.productionTip = false;

/** apply analytics */
import 'firebase/analytics';
import { firebaseApp } from './kuroco_api';
try {
  firebaseApp.analytics();
} catch (e) {
  console.info(e);
}

/**
 * mount.
 */
new Vue({
  router,
  store,
  i18n: new VueI18n({
    locale: navigator.language.slice(0, 2).toLowerCase() === 'ja' ? 'ja' : 'en',
  }),
  render: (h) => h(App),
}).$mount('#app');
