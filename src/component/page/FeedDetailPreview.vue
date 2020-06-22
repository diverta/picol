<template>
  <div class="p-feed">
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>

    <FeedContainer v-if="Object.keys(feedDetail).length > 0" :feed="feedDetail" :comments="[]" />

    <div class="p-feed__prev-wrapper">
      <a class="p-feed__prev">&lt;</a>
    </div>
  </div>
</template>

<script lang="ts">
import FeedContainer from '@/component/view/feed/FeedContainer.vue';
import { UserStateModule, TagStateModule } from '@/store';
import { FeedStateModule } from '@/store/feed';
import { FeedModel, CommentModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { Vue, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Route } from 'vue-router';
import { ServiceHelper } from '@/util';
import { CONSTANTS } from '@/core';
import { abortLoadingBigDatas } from '../atom/RouterLinkExt.vue';
import { TopicsService } from '@/kuroco_api';

@Component<FeedDetail>({
  components: {
    FeedContainer,
  },
})
export default class FeedDetail extends Vue {
  // FIELDS
  CONSTANTS = CONSTANTS;
  isLoading = true;
  feedDetail: any = {};

  // METHODS
  disabledAllLinks() {
    console.info('This page was opened as Preview Mode, all links were disabled.');
    this.$forceUpdate();

    /** disable all link/routings */
    this.$router.beforeEach((to, from, next) => {
      /** NP */
    });
    const links = Array.from(document.querySelectorAll('a'));
    links.forEach((elm) => {
      elm.setAttribute('style', 'cursor: default');
      elm.setAttribute('href', 'javascript: void(0)');
    });
  }

  // LIFECYCLE HOOKS
  async mounted() {
    try {
      const previewToken = this.$route.query.preview_token as string;
      const feed = await TopicsService.getTopicsServiceRcmsApi1Preview({ previewToken });
      feed.details.inst_ymdhi = new Date().toUTCString();
      feed.details.favorite_cnt = 0;
      feed.details.comment_cnt = 0;
      this.feedDetail = feed.details;
      this.disabledAllLinks();
    } catch (e) {
      (this as any).$snack.danger({
        text: '該当の記事が見つかりませんでした。',
      });
      return Promise.reject('feed datas are not detected.');
    }
    this.isLoading = false;
  }
}
</script>
