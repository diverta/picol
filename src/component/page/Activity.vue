<template>
  <div class="p-activity">
    <h1 class="c-headline">ACTIVITY</h1>
    <ActivityContainer :comments="comments" />
    <CustomInfiniteLoader :infiniteHandler="infiniteHandler" :messageMarginStyle="messageMarginStyle" />
  </div>
</template>

<script lang="ts">
import CustomInfiniteLoader from '@/component/atom/CustomInfiniteLoader.vue';
import ActivityContainer from '@/component/view/ActivityContainer.vue';
import { FeedStateModule } from '@/store/feed';
import { FavoriteMyListModel, FeedModel, CommentModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { StateChanger } from 'vue-infinite-loading';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserStateModule, TagStateModule } from '@/store';
import { getSortedComments } from '@/util';
import { CONSTANTS } from '@/core';

@Component<Activity>({
  components: {
    ActivityContainer,
    CustomInfiniteLoader,
  },
})
export default class Activity extends Vue {
  comments: ExtendedCommentList[] = [];

  dict: { moduleID: number; type: 'POSTED' | 'FAV' }[] = [];

  messageMarginStyle = {
    margin: '40px 0 80px 0',
  };

  infiniteHandler($state: StateChanger): void {
    FeedStateModule.loadActivity([
      { pageId: 0, ...{ cnt: 0, myFavoriteList: 1 } },
      { pageId: 0, ...{ cnt: 0, myOwnList: '1' } },
    ])
      .then(({ feeds, comments }) => {
        const [favorite, posted] = feeds;

        const sorted = getSortedComments(comments);

        const extendedComments = sorted
          .map((comment) => {
            if (posted.list.map((d) => `${d.topics_id}`).includes(`${comment.module_id}`)) {
              return { ...comment, type: 'POSTED' };
            }
            if (favorite.list.map((d) => `${d.topics_id}`).includes(`${comment.module_id}`)) {
              return { ...comment, type: 'FAV' };
            }
            console.error('Unknown comment.');
          })
          .filter((d) => d !== undefined) as ExtendedCommentList[];

        this.comments.push(...extendedComments);
      })
      .then(() => {
        // InfiniteLoader shows `no-results` msg when it has never been called.
        // hooked loaded() once for showing `no-more` instead of `no-results`.
        $state.loaded();
        $state.complete();
      })
      .catch((e) => {
        e === CONSTANTS.APP_ERROR.NO_DATA ? $state.complete() : $state.error();
      });
  }
}

export interface ExtendedCommentList extends CommentModel.Read.Response.List {
  type: 'POSTED' | 'FAV';
}
</script>
