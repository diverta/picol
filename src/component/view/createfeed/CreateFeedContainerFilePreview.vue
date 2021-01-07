<template>
  <div>
    <!-- empty element -->
    <div v-if="elmType === ELEMENT_TYPE.NONE" class="p-post__thumbnail" />
    <!-- image element -->
    <img v-if="elmType === ELEMENT_TYPE.IMAGE" class="p-post__thumbnail" :src="source.url" :style="additionalStyle" />
    <!-- video vimeo element -->
    <VimeoContainer
      v-if="elmType === ELEMENT_TYPE.VIDEO_VIMEO"
      :class="'p-post__thumbnail'"
      :id="source.file_id"
      :url="source.url"
      @load="(elm) => $emit('vimeoLoaded', elm)"
    />
    <!-- video element -->
    <video v-if="elmType === ELEMENT_TYPE.VIDEO" class="p-post__thumbnail" :src="source.url" :autoplay="true" alt />
  </div>
</template>

<script lang="ts">
import { FeedStateModule } from '@/store';
import { TagModel } from '@/type/api';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ContentService } from '@/kuroco_api';
import truncate from 'lodash/truncate';
import { PostFileHelper, util } from '@/util';

@Component<CreateFeedContainerFilePreview>({})
export default class CreateFeedContainerFilePreview extends Vue {
  // PROPS
  @Prop({
    type: Object,
    required: false,
  })
  source!: InstanceType<typeof PostFileHelper>['renderSource'][0];
  @Prop({
    type: String,
    required: true,
  })
  mediaType!: PostFileHelper['mediaType'];
  @Prop({
    type: Object,
    required: false,
  })
  additionalStyle?: object;
  @Prop({
    type: Boolean,
    required: true,
  })
  vimeo!: boolean;

  // FIELDS
  ELEMENT_TYPE = ELEMENT_TYPE;

  // MUTATIONS
  get elmType() {
    if (!this.source) {
      return ELEMENT_TYPE.NONE;
    }
    switch (this.mediaType) {
      case 'image':
        return ELEMENT_TYPE.IMAGE;
      case 'video':
        return this.vimeo ? ELEMENT_TYPE.VIDEO_VIMEO : ELEMENT_TYPE.VIDEO;
    }
  }
}

enum ELEMENT_TYPE {
  NONE,
  IMAGE,
  VIDEO_VIMEO,
  VIDEO,
}
</script>
