/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import { AuthenticationService } from '@/kuroco_api/services/AuthenticationService';
import { LocalStorage } from '@/kuroco_api';

export class FirebaseUtil {
  static app: firebase.app.App;

  static async getStorage() {
    if (FirebaseUtil.app === undefined || FirebaseUtil.app.name !== LocalStorage.getCompanyCd()) {
      await FirebaseUtil.initialize(LocalStorage.getCompanyCd()?.toString());
    }
    return firebase.storage(FirebaseUtil.app);
  }

  static async initialize(companyCd: string | undefined) {
    if (companyCd === undefined) {
      console.log('companyCd is not found.');
      return false;
    }
    const { body } = await AuthenticationService.postAuthenticationServiceRcmsApi1FirebaseToken({});
    const app = firebase.initializeApp(body.firebaseConfig, companyCd);
    await app.auth().signInWithCustomToken(body.token);

    //app.analytics();
    FirebaseUtil.app = app;
  }

  static async clear(companyCd: string | undefined) {
    if (FirebaseUtil.app !== undefined && FirebaseUtil.app.name === companyCd) {
      await firebase.app(companyCd).delete();
    }
  }
}
