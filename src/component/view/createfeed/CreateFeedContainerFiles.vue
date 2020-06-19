<template>
  <div class="p-post__files">
    <div class="p-post__file" v-for="(source, idx) in renderSource" :key="idx">
      <div class="p-post__file-input-wrapper" :style="wrapperStyle">
        <input type="file" class="p-post__file-input" @change.prevent="($event) => $emit('change', $event, idx)" />
        <CreateFeedContainerFilePreview
          v-bind="{
            ...$props,
            source,
            additionalStyle: imageRotationStyles[idx],
            vimeo,
          }"
          @vimeoLoaded="(elm) => (vimeoElm = elm)"
        />
      </div>

      <button v-if="source" class="p-post__file-delete" @click.prevent="() => $emit('delete', idx)">
        削除する
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import CreateFeedContainerFilePreview from './CreateFeedContainerFilePreview.vue';

import { FeedStateModule } from '@/store';
import { TagModel } from '@/type/api';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TopicsService } from '@/kuroco_api';
import truncate from 'lodash/truncate';
import { PostFileHelper, util } from '@/util';
import { POSTING_STATUS } from './CreateFeedContainer.vue';

@Component<CreateFeedContainerFiles>({
  components: {
    CreateFeedContainerFilePreview,
  },
})
export default class CreateFeedContainerFiles extends Vue {
  // PROPS
  @Prop({
    type: Array,
    required: true,
  })
  renderSource!: PostFileHelper['renderSource'];
  @Prop({
    type: String,
    required: true,
  })
  mediaType!: PostFileHelper['mediaType'];
  @Prop({
    type: Array,
    required: true,
  })
  imageRotationStyles!: [];
  @Prop({
    type: Boolean,
    required: true,
  })
  vimeo!: boolean;
  @Prop({
    type: String,
    required: true,
  })
  postingState!: POSTING_STATUS;

  // MUTATIONS
  get wrapperStyle() {
    const hidden = {
      marginTop: '-100px',
      paddingTop: '0px',
    };
    if (this.vimeo && this.postingState === POSTING_STATUS.LOADING) {
      return hidden;
    }
    if (this.vimeo) {
      return {
        paddingTop: this.vimeoElm ? `${this.vimeoElm.clientHeight}px` : '260px',
      };
    }

    return {};
  }

  // FIELDS
  vimeoElm: Element | null = null;
  POSTING_STATUS = POSTING_STATUS;
}

export interface CreateFeedContainerFilesInput {
  helper: PostFileHelper;
}

enum ELEMENT_TYPE {
  NONE,
  IMAGE,
  VIDEO_VIMEO,
  VIDEO,
}
</script>
