import Activity from '@/component/page/Activity.vue';
import CreateFeed from '@/component/page/CreateFeed.vue';
import Feed from '@/component/page/Feed.vue';
import FeedDetail from '@/component/page/FeedDetail.vue';
import Login from '@/component/page/Login.vue';
import MyPage from '@/component/page/MyPage.vue';
import MyPageCommented from '@/component/page/MyPageCommented.vue';
import MyPageLiked from '@/component/page/MyPageLiked.vue';
import TagFeed from '@/component/page/TagFeed.vue';
import Search from '@/component/page/Search.vue';
import { Auth } from '@/kuroco_api/core/Auth';
import { guardConfigureFns } from '@/router_guards';
import Vue from 'vue';
import Router, { RouterMode, RouterOptions } from 'vue-router';

const routerOptions: RouterOptions = {
  mode: 'history' as RouterMode,
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  /* option of compatibility to IE9: force immutable link url, not #hash mode */
  fallback: false,
  scrollBehavior: (to, from, savedPosition) => {
    if (!savedPosition) {
      return { x: 0, y: 0 };
    }

    // wait for all image sizes measured.
    async function loadAllTopicImageSizes() {
      const allImages = Array.from(document.querySelectorAll('.c-entry img') as NodeListOf<HTMLImageElement>).filter(
        (dom) => dom,
      );

      const scrapeImageSize = (img: HTMLImageElement) =>
        new Promise((res, rej) => {
          const intervalID = setInterval(() => {
            if (img.height) {
              clearInterval(intervalID);
              res();
            }
          }, 100);
        });

      await Promise.all(allImages.map((img) => scrapeImageSize(img)));
    }

    // scroll to top initially, then load all images rendered, finally scroll to former position.
    setTimeout(() => window.scrollTo(0, 0), 0); // set sctoll top over Vue initializations.
    return loadAllTopicImageSizes().then(() => {
      window.scrollTo({
        top: savedPosition.y,
        left: savedPosition.x,
        behavior: 'smooth',
      });
      return Promise.resolve({ x: window.scrollX, y: window.scrollY });
    });
  },
  routes: [
    {
      path: '/',
      name: 'feeds',
      component: Feed,
    },
    /**
     * hooks intermidiete layer to the routings for preparing RCMS router.
     * vue-router stands on RCMS router, those brings double routing,
     * and RCMS router can not handle routing if vue-router routes based on root path ('/').
     * @see https://demo-picol.r-cms.jp/management/page/page_router_list/
     */
    {
      path: '/sub',
      name: 'sub',
      component: Vue.component('child-component', {
        render: (h: any) => h('router-view'),
      }),
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          props: true,
        },
        {
          path: 'feed/tag',
          name: 'tagFeed',
          component: TagFeed,
          props: true,
        },
        {
          path: 'feed',
          name: 'feedDetail',
          component: FeedDetail,
          props: true,
        },
        {
          path: 'search',
          name: 'search',
          component: Search,
        },
        {
          path: 'mypage',
          name: 'mypage',
          component: MyPage,
        },
        {
          path: 'mypage/favorits',
          name: 'mypageFavorits',
          component: MyPageLiked,
        },
        {
          path: 'mypage/commented',
          name: 'mypageCommented',
          component: MyPageCommented,
        },
        {
          path: 'activity',
          name: 'activity',
          component: Activity,
        },
        {
          path: 'post/:topics_id',
          name: 'postWithArguments',
          component: CreateFeed,
        },
        {
          path: 'post',
          name: 'post',
          component: CreateFeed,
        },
      ],
    },
    {
      path: '/logout/',
      name: 'logout',
      beforeEnter: async () => {
        await Auth.logout({});
        window.location.href = '/sub/login';
      },
    },
    { path: '*', redirect: '/' },
  ],
};

Vue.use(Router);
const router = new Router(routerOptions);

guardConfigureFns.forEach((fn) => fn(router));

export default router;
