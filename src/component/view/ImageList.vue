<template>
  <div class="c-section">
    {{ title }}
    <dd class="c-section__body--thumbnail">
      <div class="c-thumbnail-list">
        <ul class="c-thumbnail-list__items">
          <li class="c-thumbnail-list__item" v-for="(feed, idx) in feeds" :key="idx">
            <ImageListItem :mediaDef="getMediaDefFromFeed(feed)" :feedId="feed.topics_id" />
          </li>
        </ul>
      </div>
    </dd>
  </div>
</template>

<script lang="ts">
import ImageListItem from '@/component/view/ImageListItem.vue';
import { FeedModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CONSTANTS } from '@/core';
import { getMediasFromFeedData } from '@/util';

@Component<ImageList>({
  components: {
    ImageListItem,
  },
})
export default class ImageList extends Vue {
  @Prop({ type: Array })
  feeds!: FeedModel.Read.Response.Feed[];

  @Prop({ type: Number })
  pageID!: number;

  @Prop({ type: String, default: '' })
  sectionTitle!: string;

  get title() {
    return this.pageID === 1 ? this.sectionTitle : null;
  }

  getMediaDefFromFeed(feed: FeedModel.Read.Response.Feed): FeedModel.MediaFromFeed {
    const medias = getMediasFromFeedData(feed);
    return medias.length > 0
      ? medias[0]
      : {
          desc: 'dummyImage.png',
          file_id: 'dummy',
          url: CONSTANTS.UNKNOWN_IMAGE_PATH,
          type: 'image',
        };
  }
}
</script>

<style scoped>
.c-section {
  margin-bottom: -24px;
}
</style>
