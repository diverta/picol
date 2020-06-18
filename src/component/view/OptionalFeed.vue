<template>
  <div class="p-feed">
    <h1 v-if="title" class="c-headline">{{ title }}</h1>
    <div v-if="feeds.length > 0">
      <FeedContainer
        :feed="feed"
        v-for="feed in feeds"
        :key="feed.topics_id"
        :comments="comments"
        :onChangeFeed="onChangeFeed"
      />
    </div>
    <CustomInfiniteLoader :infiniteHandler="infiniteHandler" ref="Infinite" />
  </div>
</template>

<script lang="ts">
import CustomInfiniteLoader from '@/component/atom/CustomInfiniteLoader.vue';
import FeedContainer from '@/component/view/feed/FeedContainer.vue';
import { FeedStateModule } from '@/store/feed';
import { FeedModel, CommentModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { StateChanger } from 'vue-infinite-loading';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserStateModule, TagStateModule } from '@/store';
import { ServiceHelper } from '@/util';
import { TopicsService } from '@/kuroco_api/services/TopicsService';

@Component<OptionalFeed>({
  components: {
    FeedContainer,
    CustomInfiniteLoader,
  },
})
export default class OptionalFeed extends Vue {
  // PROPS
  @Prop({ type: String, required: true, default: () => '' })
  title!: string;
  @Prop({
    type: Object,
    required: true,
    default: () => ({}),
  })
  query!: TopicsService.getTopicsServiceRcmsApi1FeedsRequest;

  // FIELDS
  comments: CommentModel.Read.Response.List[] = [];
  feeds: FeedModel.Read.Response.Feed[] = [];

  // METHODS
  infiniteHandler($state: StateChanger): void {
    FeedStateModule.loadPage(this.query)
      .then(async (page) => {
        const { list, pageInfo } = page.feed;
        this.feeds.replaceAll(list);
        this.comments.replaceAll(page.comments.map((c) => c.list).flat());
      })
      .then(() => {
        // InfiniteLoader shows `no-results` msg when it has never been called.
        // hooked loaded() once for showing `no-more` instead of `no-results`.
        $state.loaded();
        $state.complete();
      })
      .catch((e) => $state.error());
  }
  onChangeFeed() {
    // vue-infinit-loader can not detect reset() event properly when scroll events had not dispatched.
    // clears feeds data to work reset() forcefully.
    this.feeds.replaceAll([]);
    (this.$refs.Infinite as any).reset();
  }
}
</script>
