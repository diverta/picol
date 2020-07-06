<template>
  <div class="l-wrapper" id="app">
    <main class="l-main">
      <div class="p-mypage">
        <h1 class="c-headline">MY PAGE</h1>
        <div class="p-mypage__profile">
          <div class="p-mypage__profile-body">
            <p class="p-mypage__icon-wrapper">
              <img :src="myAvatarSrc" alt class="p-mypage__icon" />
            </p>
            <div class="p-mypage__text-wrapper">
              <p class="p-mypage__account">{{ selfUser.nickname }}</p>
              <p class="p-mypage__facility">{{ selfUser.team_name }}</p>
              <p class="p-mypage__entry">
                {{ $t('post') }}
                <span class="p-mypage__entry-number">{{ $t('total') }}:{{ totalCntStr }}</span>
              </p>
            </div>
          </div>
          <ul class="p-mypage__menu">
            <li class="p-mypage__menu-item--edit">
              <a href="#" class="p-mypage__menu-link" @click.prevent="() => (showsProfileEdit = true)">{{
                $t('edit_profile')
              }}</a>
            </li>
            <li class="p-mypage__menu-item--like">
              <router-link-ext :to="{ name: 'mypageFavorits' }" exact>
                <a class="p-mypage__menu-link">{{ $t('favorited_post') }}</a>
              </router-link-ext>
            </li>
            <li class="p-mypage__menu-item--comment">
              <router-link-ext :to="{ name: 'mypageCommented' }" exact>
                <a href="#" class="p-mypage__menu-link">{{ $t('commented_post') }}</a>
              </router-link-ext>
            </li>
          </ul>
        </div>

        <ImageList :feeds="list" :pageID="pageID" />
        <CustomInfiniteLoader :messageMarginStyle="messageMarginStyle" :infiniteHandler="infiniteHandler" />
      </div>
    </main>

    <ProfileEdit v-if="showsProfileEdit" :shows.sync="showsProfileEdit" />
  </div>
</template>

<script lang="ts">
import CustomInfiniteLoader from '@/component/atom/CustomInfiniteLoader.vue';
import ImageList from '@/component/view/ImageList.vue';
import ProfileEdit from '@/component/view/ProfileEdit.vue';
import { OverlayStateModule } from '@/store/overlay';
import { FeedModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { StateChanger } from 'vue-infinite-loading';
import { Component, Vue } from 'vue-property-decorator';
import { UserStateModule, FeedStateModule } from '@/store';
import { CONSTANTS } from '@/core';
import { TopicsService } from '@/kuroco_api/services/TopicsService';

@Component<MyPage>({
  components: {
    CustomInfiniteLoader,
    ImageList,
    ProfileEdit,
  },
})
export default class MyPage extends Vue {
  // FIELDS
  UserStateModule = UserStateModule;
  pageID = 1;
  totalCntStr = '...';
  totalPageCnt?: number;
  list: FeedModel.Read.Response.Feed[] = [];
  query: TopicsService.getTopicsServiceRcmsApi1FeedsRequest = {
    myOwnList: '1',
  };
  messageMarginStyle = {
    margin: '40px 0',
  };
  showsProfileEdit = false;

  // MUTATIONS
  get selfUser() {
    return this.UserStateModule.selfUser;
  }
  get myAvatarSrc(): string {
    return this.UserStateModule.myImage;
  }

  // METHODS
  infiniteHandler($state: StateChanger): void {
    if (this.totalPageCnt !== undefined && this.totalPageCnt < this.pageID) {
      $state.complete();
      return;
    }
    FeedStateModule.loadPage({ ...this.query, pageId: this.pageID })
      .then(({ feed }) => {
        const { list, pageInfo } = feed;
        this.list.push(...list);
        this.totalPageCnt = pageInfo.totalPageCnt;
        this.pageID += 1;
        this.totalCntStr = `${pageInfo.totalCnt}`;
      })
      .then(() => $state.loaded())
      .catch((e) => {
        switch (e) {
          case CONSTANTS.APP_ERROR.NO_DATA:
            this.totalCntStr = '0';
            $state.complete();
          default:
            $state.error();
        }
        e === CONSTANTS.APP_ERROR.NO_DATA ? $state.complete() : $state.error();
      });
  }

  // LIFECYCLE HOOKS
  mounted() {
    this.UserStateModule.initialize({});
  }
}
</script>
<i18n locale="ja" lang="json5">
{
  "post": "投稿",
  "post_cnt": "総数",
  "edit_profile": "プロフィール編集",
  "favorited_post": "いいねした投稿",
  "commented_post": "コメントした投稿"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "post": "Posted",
  "post_cnt": "Total",
  "edit_profile": "Edit profile",
  "favorited_post": "Liked post",
  "commented_post": "Commented post"
}
</i18n>
