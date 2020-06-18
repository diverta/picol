<template>
  <div :class="[`c-entry__image-wrapper${hasAnyMedias ? '' : '--absent'}`]">
    <carousel-wrapper>
      <slide v-for="(mediaDef, idx) in medias" :key="`image-${idx}`">
        <img
          v-if="mediaDef.type === 'image'"
          :src="mediaDef.url"
          alt="image"
          class="c-entry__image"
          @click="handleOnClickMedia"
          data-bigfile
        />
        <vimeo-container v-else :videoClass="'c-entry__video'" :id="mediaDef.file_id" :url="mediaDef.url" />
      </slide>
    </carousel-wrapper>
  </div>
</template>

<script lang="ts">
import { CONSTANTS } from '@/core/constants';
import { FeedModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getMediasFromFeedData } from '@/util';

@Component<FeedContentImageWrapper>({})
export default class FeedContentImageWrapper extends Vue {
  // PROPS
  @Prop({ type: Object, required: true })
  feed!: FeedModel.Read.Response.Feed;

  // MUTATIONS
  get mediasFromFeed() {
    return getMediasFromFeedData(this.feed);
  }
  get hasAnyMedias(): boolean {
    return this.mediasFromFeed.length > 0;
  }
  get medias(): FeedModel.MediaFromFeed[] {
    return this.hasAnyMedias
      ? this.mediasFromFeed
      : [
          {
            file_nm: 'dummyImage.png',
            file_id: 'dummy',
            type: 'image',
            url: CONSTANTS.UNKNOWN_IMAGE_PATH,
          },
        ];
  }

  // METHODS
  handleOnClickMedia(e: any) {
    if (this.$route.path !== '/sub/feed') {
      this.$router.push({ name: 'feedDetail', query: { topics_id: `${this.feed.topics_id}` } });
    }
  }
}
</script>
