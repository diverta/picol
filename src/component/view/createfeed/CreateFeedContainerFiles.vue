<template>
  <div class="p-post__files">
    <div class="p-post__file" v-for="(source, idx) in renderSource" :key="idx">
      <div class="p-post__file-input-wrapper" :style="wrapperStyle">
        <input
          type="file"
          class="p-post__file-input"
          @change.prevent="($event) => handleOnMediaInputChange($event, idx)"
        />
        <CreateFeedContainerFilePreview
          v-bind="{
            ...$props,
            source,
            additionalStyle: imageRotationStyles[idx],
            vimeo: vimeo && !updated,
          }"
          @vimeoLoaded="(elm) => (vimeoElm = elm)"
        />
      </div>

      <button v-if="source" class="p-post__file-delete" @click.prevent="() => handleOnMediaInputDelete(idx)">
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

@Component<CreateFeedContainerFiles>({
  components: {
    CreateFeedContainerFilePreview,
  },
})
export default class CreateFeedContainerFiles extends Vue {
  // PROPS
  @Prop({
    type: Object,
    required: true,
  })
  helper!: PostFileHelper;
  @Prop({
    type: Boolean,
    required: true,
  })
  vimeo!: boolean;

  // MUTATIONS
  get wrapperStyle() {
    const hidden = {
      marginTop: '-100px',
      paddingTop: '0px',
    };
    if (this.vimeo && this.postingState === POSTING_STATUS.LOADING) {
      return hidden;
    }
    if (this.vimeo && !this.updated) {
      return {
        paddingTop: this.vimeoElm ? `${this.vimeoElm.clientHeight}px` : '260px',
      };
    }

    return {};
  }

  // FIELDS
  renderSource: InstanceType<typeof PostFileHelper>['renderSource'] = this.helper.renderSource;
  vimeoElm: Element | null = null;
  imageRotationStyles = this.helper ? this.helper.renderSource.map(() => ({ transform: 'none' })) : [];

  POSTING_STATUS = POSTING_STATUS;
  postingState?: POSTING_STATUS;
  updated = false;

  // METHODS
  @Watch('postingState')
  emitpostingState(pre: POSTING_STATUS, cur: POSTING_STATUS) {
    this.$emit('change', cur);
  }
  handleOnMediaInputDelete(idx: number) {
    this.helper.remove(idx);
    this.$forceUpdate();
  }
  handleOnMediaInputChange(e: Event, idx: number) {
    const newFile = (e.target as any).files[0];
    if (newFile === undefined) {
      return;
    }

    // checking does whether this file have a proper extension.
    if (!util.File.isProperFile({ file: newFile })) {
      window.alert(`${newFile.name} の拡張子は対応していません。`);
      return;
    }
    const mediaType = util.File.getFileType(newFile.name);

    // confirm if the data is not matching types of previous files.
    if (
      this.helper.renderSource.some((d) => d !== null) &&
      ((mediaType === 'image' && this.helper.mediaType === 'video' && this.helper._source.video.length !== 0) ||
        (mediaType === 'video' && this.helper.mediaType === 'image' && this.helper._source.image.length !== 0))
    ) {
      const result = window.confirm(`
        画像/動画は同時に投稿できません。
        このファイルをアップロードする代わりに、
        アップロード済みの${this.helper.mediaType === 'video' ? '動画' : '写真'}ファイルを削除してよろしいですか？
      `);
      if (result === false) {
        return;
      }
    }
    this.helper.mediaType = mediaType;

    this.$emit('change', POSTING_STATUS.LOADING);
    const prms =
      mediaType === 'video'
        ? this.helper.adoptVideo(newFile, mediaType)
        : this.helper.adoptImage(newFile, mediaType, idx);
    prms
      // fix rotations
      .then(() => {
        if (mediaType === 'image') {
          util.getOrientation(newFile, (orientationValue: number) => {
            this.imageRotationStyles[idx] = {
              transform: util.getTransformValueByExifOrientationInfo(orientationValue),
            };
          });
        }

        this.renderSource = this.helper.renderSource;
        this.updated = true;
      })
      .then(() => this.$emit('change', POSTING_STATUS.COMPLETE))
      .catch((e) => this.$emit('change', POSTING_STATUS.ERROR));
  }
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

export enum POSTING_STATUS {
  PRE = 'PRE',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}
</script>
