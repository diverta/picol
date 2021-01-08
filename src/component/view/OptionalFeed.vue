<template>
  <div class="p-feed">
    <h1 v-if="title" class="c-headline">{{ title }}</h1>
    <div v-if="feeds.length > 0">
      <FeedContainer v-for="feed in feeds" :feed="feed" :key="feed.topics_id" :comments="comments" />
    </div>
    <CustomInfiniteLoader :infiniteHandler="infiniteHandler" ref="Infinite" />
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
import { ContentService } from '@/kuroco_api/services/ContentService';

@Component<OptionalFeed>({
  components: {
    FeedContainer,
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
  query!: ContentService.getContentServiceRcmsApi1FeedsRequest;

  // FIELDS
  get feeds(): FeedModel.Read.Response.Feed[] {
    return FeedStateModule.all.list;
  }
  get comments(): CommentModel.Read.Response.List[] {
    return FeedStateModule.comments;
  }

  // METHODS
  infiniteHandler($state: StateChanger): void {
    FeedStateModule.loadPageAndStore(this.query)
      .then(() => {
        // InfiniteLoader shows `no-results` msg when it has never been called.
        // hooked loaded() once for showing `no-more` instead of `no-results`.
        $state.loaded();
        $state.complete();
      })
      .catch((e) => $state.error());
  }

  mounted() {
    FeedStateModule.clear();
  }
}
</script>
