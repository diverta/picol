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
import { CONSTANTS } from '@/core';
import { ContentService, LocalStorage } from '@/kuroco_api';
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

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
      const companyCode = this.$route.query.company_cd as string;
      if (companyCode !== undefined) {
        LocalStorage.setCompanyCd(companyCode);
      }
      const previewToken = this.$route.query.preview_token as string;
      const feed = (await ContentService.getContentServiceRcmsApi1Preview({ previewToken })).body;
      feed.details.inst_ymdhi = new Date().toUTCString();
      feed.details.favorite_cnt = 0;
      feed.details.comment_cnt = 0;
      this.feedDetail = feed.details;
      this.disabledAllLinks();
    } catch (e) {
      this.$snack.danger({
        text: 'Not found.',
      });
      return Promise.reject('feed datas are not detected.');
    }
    this.isLoading = false;
  }
}
</script>
