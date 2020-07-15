<template>
  <div class="p-feed">
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>

    <FeedContainer
      v-if="Object.keys(feed).length > 0"
      :feed="feed"
      :comments="comments"
      @commit-change="() => loadPage()"
    />

    <div class="p-feed__prev-wrapper">
      <a class="p-feed__prev" @click.prevent="back">&lt;</a>
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

@Component<FeedDetail>({
  components: {
    FeedContainer,
  },
})
export default class FeedDetail extends Vue {
  // FIELDS
  isLoading = true;
  comments: CommentModel.Read.Response.List[] = [];
  feed: FeedModel.Read.Response.Feed | {} = {};

  // MUTATIONS
  get myAvatarSrc(): string {
    return UserStateModule.myImage;
  }
  get feedID() {
    return this.$route.query.topics_id as string;
  }

  // METHODS
  back() {
    abortLoadingBigDatas();
    this.$router.back();
  }
  loadPage() {
    if (this.feedID === undefined) {
      return;
    }

    FeedStateModule.loadPage({ id: [Number(this.feedID)] })
      .then(({ feed, comments }) => {
        this.feed = { ...this.feed, ...feed.list[0] };
        this.comments.replaceAll(comments.map((c) => c.list).flat());
      })
      .catch((e) => {
        this.$snack.danger({
          text: 'Not found.',
        });
        this.$router.push({ path: '/' });
        return Promise.reject('feed datas are not detected.');
      })
      .finally(() => (this.isLoading = false));
  }

  // LIFECYCLE HOOKS
  mounted() {
    this.loadPage();
  }
}
</script>
