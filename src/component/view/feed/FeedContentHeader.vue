<template>
  <div class="c-entry__header">
    <img :src="getAvaterSrc(this.memberID)" alt class="c-entry__post-icon" />
    <p class="c-entry__post-name">{{ getUserName(memberID) }}</p>
    <p class="c-entry__post-time">{{ getHowLongBeforePostedData(this.feedPostedDateStr) }}</p>
  </div>
</template>

<script lang="ts">
import { UserStateModule } from '@/store';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<FeedContentHeader>({})
export default class FeedContentHeader extends Vue {
  // PROPS
  @Prop({ type: Number, required: true })
  memberID!: number;
  @Prop({ type: String, required: true })
  feedPostedDateStr!: string;

  // MUTATIONS
  get getUserName() {
    return this.memberID === UserStateModule.selfUser.member_id
      ? (dummy: any) => UserStateModule.selfUser.nickname
      : UserStateModule.getUserName;
  }
  get getAvaterSrc() {
    return this.memberID === UserStateModule.selfUser.member_id
      ? (dummy: any) => UserStateModule.myImage
      : UserStateModule.getSmallImage;
  }
}
</script>
