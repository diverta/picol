/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import { AuthenticationService } from '@/kuroco_api/services/AuthenticationService';

export class FirebaseUtil {
  static app: firebase.app.App;

  static async getStorage() {
    if (FirebaseUtil.app === undefined) {
      await FirebaseUtil.initialize();
    }
    return firebase.storage();
  }

  static async initialize() {
    const { body } = await AuthenticationService.postAuthenticationServiceRcmsApi1FirebaseToken({});
    const app = firebase.initializeApp(body.firebaseConfig);
    await app.auth().signInWithCustomToken(body.token);
    app.analytics();
    FirebaseUtil.app = app;
  }

  static async clear() {
    if (FirebaseUtil.app !== undefined) {
      await firebase.app().delete();
    }
  }
}
