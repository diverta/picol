<template>
  <div class="p-feed">
    <div v-if="feeds.length > 0">
      <transition-group name="fade-down" mode="out-in" appear>
        <FeedContainer :feed="feed" v-for="feed in feeds" :key="feed.topics_id" :comments="comments" />
      </transition-group>
    </div>
    <CustomInfiniteLoader :infiniteHandler="infiniteHandler" showsNoMoreMessage />
  </div>
</template>

<script lang="ts">
import FeedContainer from '@/component/view/feed/FeedContainer.vue';
import { FeedStateModule } from '@/store/feed';
import { FeedModel, CommentModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { StateChanger } from 'vue-infinite-loading';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserStateModule, TagStateModule } from '@/store';
import { ServiceHelper } from '@/util';
import { Auth } from '@/kuroco_api/core/Auth';
import { CONSTANTS } from '@/core/constants';

@Component<Feed>({
  components: {
    FeedContainer,
  },
})
export default class Feed extends Vue {
  // MUTATIONS
  get feeds(): FeedModel.Read.Response.Feed[] {
    return FeedStateModule.all.list;
  }
  get totalPageCnt(): number {
    const totalPageCnt = FeedStateModule.all.pageInfo.totalPageCnt;
    return totalPageCnt ? totalPageCnt : Infinity;
  }
  get pageID(): number {
    const pageNo = FeedStateModule.all.pageInfo.pageNo;
    return pageNo ? pageNo + 1 : 1;
  }
  get comments(): CommentModel.Read.Response.List[] {
    return FeedStateModule.comments;
  }

  // METHODS
  infiniteHandler($state: StateChanger): void {
    if (this.totalPageCnt < this.pageID) {
      $state.complete();
      return;
    }

    FeedStateModule.loadPageAndStore({
      pageId: this.pageID,
    })
      .then(() => $state.loaded())
      .catch((e) => (CONSTANTS.APP_ERROR.NO_DATA === e ? $state.complete() : $state.error()));
  }
}
</script>
