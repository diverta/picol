<template>
  <router-link-ext :to="{ name: 'feedDetail', query: { topics_id: this.feedId } }" class="c-thumbnail-list__link" exact>
    <img
      v-if="mediaDef.type === 'image'"
      :src="mediaDef.url"
      alt="image"
      class="c-thumbnail-list__image"
      data-bigfile
    />
    <VimeoContainer
      v-else-if="mediaDef.type === 'video'"
      :class="'c-thumbnail-list__video'"
      :id="mediaDef.file_id"
      :url="mediaDef.url"
      alt="video"
    />
  </router-link-ext>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CONSTANTS } from '@/core';
import { FeedModel } from '@/type';

@Component<ImageListItem>({})
export default class ImageListItem extends Vue {
  @Prop({ type: Object, required: true })
  mediaDef!: FeedModel.MediaFromFeed;

  @Prop()
  feedId!: number;
}
</script>
