<template>
  <article class="c-entry">
    <FeedContentHeader :memberID="feed.member_id" :feedPostedDateStr="feed.inst_ymdhi" />

    <FeedContentImageWrapper :feed="feed" />

    <div class="c-entry__body">
      <FeedContentBody :feed="feed" />
      <FeedContentButtonsContainer :feed="feed" v-on="$listeners" />
      <FeedContentInfoStatuses :statuses="getFeedStatuses(feed)" />
      <FeedContentTags :tags="feed.tags" />
      <FeedContentComments :topicsID="feed.topics_id" :comments="getComment(feed.topics_id)" v-on="$listeners" />
    </div>

    <FeedContentCommentForm :feed="feed" v-on="$listeners" />
  </article>
</template>

<script lang="ts">
import { TagStateModule, UserStateModule } from '@/store';
import { FeedModel, CommentModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import FeedContentBody from './FeedContentBody.vue';
import FeedContentCommentForm from './FeedContentCommentForm.vue';
import FeedContentImageWrapper from './FeedContentImageWrapper.vue';
import FeedContentComments from './FeedContentComments.vue';
import FeedContentHeader from './FeedContentHeader.vue';
import FeedContentInfoStatuses from './FeedContentInfoStatuses.vue';
import FeedContentButtonsContainer from './FeedContentButtonsContainer.vue';
import FeedContentTags from './FeedContentTags.vue';

@Component<FeedContainer>({
  inheritAttrs: false,
  components: {
    FeedContentHeader,
    FeedContentImageWrapper,
    FeedContentBody,
    FeedContentButtonsContainer,
    FeedContentInfoStatuses,
    FeedContentTags,
    FeedContentComments,
    FeedContentCommentForm,
  },
})
export default class FeedContainer extends Vue {
  // PROPS
  @Prop({ type: Object, required: true })
  feed!: FeedModel.Read.Response.Feed;
  @Prop({ type: Array, required: true })
  comments!: CommentModel.Read.Response.List[];

  // MUTATIONS
  get getComment() {
    return (moduleId: number) => this.comments.filter((c) => c.module_id === moduleId);
  }
  get getFeedStatuses() {
    return (feed: FeedModel.Read.Response.Feed) => [
      {
        name: this.$t('favorite'),
        cnt: feed.favorite_cnt,
      },
      {
        name: this.$t('comment'),
        cnt: feed.comment_cnt,
      },
    ];
  }
}
</script>
<i18n locale="ja" lang="json5">
{
  "favorite": "いいね",
  "comment": "コメント",
}
</i18n>
<i18n locale="en" lang="json5">
{
  "favorite": "Like",
  "comment": "Comment",
}
</i18n>
