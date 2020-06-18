import Vue from 'vue';
import Vuex from 'vuex';
import { IFeedState } from '@/store/feed';
import { IOverlayState } from '@/store/overlay';
import { ITagState } from '@/store/tag';
import { IUserState } from '@/store/user';

Vue.use(Vuex);

/**
 * global state/store.
 */
export interface IRootState {
  feed: IFeedState;
  overlay: IOverlayState;
  tag: ITagState;
  user: IUserState;
}

export default new Vuex.Store<IRootState>({});
