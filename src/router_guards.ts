import { FeedStateModule, UserStateModule } from '@/store';
import Vue from 'vue';
import Router from 'vue-router';
import { Auth } from '@/kuroco_api/core/Auth';
import { AuthenticationService, MembersService, LocalStorage } from '@/kuroco_api';

/**
 * makes Vue render snackbar.
 */
const dispatchRenderSnackbar = (text: string) => {
  // sort execution of vue-snack to the end in Vue lifecycle
  setTimeout(
    () =>
      Vue.prototype.$snack.show({
        text,
      }),
    0,
  );
};

/**
 * returns val is empty.
 * @param val any value.
 */
const isEmpty = (val: any) => val === null || val === undefined || val === '';

const pagePaths = {
  initial: '/sub/login',
  myPage: '/sub/mypage',
};

/**
 * once SAML requested, the backend redirected to root with a query,
 * which has for user info and token.
 * @param router
 */
const execApplyQueryInfo = (router: Router): void => {
  router.beforeEach(async (to, from, next) => {
    if (to.path === '/') {
      const { grant_token, member_id } = to.query;
      // in SAML login, the server returns URI which is appended grant_token.
      if (grant_token) {
        await Auth.createToken({ requestBody: { grant_token: grant_token as string } }).catch((err) => {
          next({ path: pagePaths.initial });
          return;
        });
      }
      if (member_id) {
        await UserStateModule.initialize({ member_id: Number(member_id) });
      }

      // clean up queries
      if (grant_token || member_id) {
        next({ path: to.path });
      }
    }
    next();
  });
};

/**
 * this App is using token-based authentication system so user must have unique token.
 * @param router
 */
const guardNoTokenUsers = (router: Router): void => {
  router.beforeEach(async (to, from, next) => {
    if (to.path !== pagePaths.initial && isEmpty(LocalStorage.getAccessToken())) {
      dispatchRenderSnackbar('ログインしてください。');
      next({ path: pagePaths.initial });
      return;
    }
    next();
  });
};

/**
 * Users are supposed to have own nickname, if it is empty,
 * we notice about it and route to user's profile page.
 * @param router
 */
const guardNoNicknameUsers = (router: Router): void => {
  router.beforeEach((to, from, next) => {
    if (to.path !== pagePaths.initial && to.path !== pagePaths.myPage && isEmpty(UserStateModule.selfUser.nickname)) {
      AuthenticationService.getAuthenticationServiceRcmsApi1Profile({})
        .then((res) => UserStateModule.initialize(res))
        .then(() => {
          if (isEmpty(UserStateModule.selfUser.nickname)) {
            dispatchRenderSnackbar('ニックネームを登録してください。');
            next({ path: pagePaths.myPage });
          }
        })
        .catch(() => {
          dispatchRenderSnackbar('ログインしてください。');
          Auth.logout({}).finally(() => {
            next({ path: pagePaths.initial });
          });
        });
    }
    next();
  });
};

export const guardConfigureFns: ((router: Router) => void)[] = [
  execApplyQueryInfo,
  guardNoTokenUsers,
  guardNoNicknameUsers,
];
