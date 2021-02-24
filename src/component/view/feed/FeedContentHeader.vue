<template>
  <div class="c-entry__header">
    <img :src="getAvaterSrc(feed.member_id)" alt class="c-entry__post-icon" />
    <p class="c-entry__post-name">{{ getUserName(feed.memberID) }}</p>
    <p class="c-entry__post-time">{{ getHowLongBeforePostedData(this.feedPostedDateStr) }}</p>
  </div>
</template>

<script lang="ts">
import { UserStateModule } from '@/store';
import { FeedModel } from '@/type';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<FeedContentHeader>({})
export default class FeedContentHeader extends Vue {
  // PROPS
  @Prop({ type: Object, required: true })
  feed!: FeedModel.Read.Response.Feed;

  // MUTATIONS
  get getUserName() {
    return this.feed?.member_id === UserStateModule.selfUser.member_id
      ? (dummy: any) => UserStateModule.selfUser.nickname
      : UserStateModule.getUserName;
  }
  get getAvaterSrc() {
    return this.feed?.member_id === UserStateModule.selfUser.member_id
      ? (dummy: any) => UserStateModule.myImage
      : UserStateModule.getImage;
  }
  get feedPostedDateStr() {
    const { ymd, post_time } = this.feed;
    return `${ymd}T${post_time}`;
  }
}
</script>
