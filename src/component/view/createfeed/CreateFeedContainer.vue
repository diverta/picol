<template>
  <main class="l-main">
    <loading :active="postingState === 'LOADING'" :can-cancel="false" :is-full-page="true"></loading>

    <div class="p-post" v-if="initializedWith !== null">
      <h1 class="p-post__title c-headline">投稿する</h1>
      <div class="p-post__body">
        <div class="p-post__content">
          <CreateFeedContainerFiles
            v-if="helper"
            v-bind="{
              renderSource: helper.renderSource,
              mediaType: helper.mediaType,
              imageRotationStyles,
              vimeo: initializedWith === 'video' && !updated,
              postingState,
            }"
            @change="handleOnMediaInputChange"
            @delete="(idx) => helper.remove(idx)"
          />
          <CreateFeedContainerCaption :commentInput.sync="commentInput" />
        </div>
        <CreateFeedContainerTags :selectedTags.sync="selectedTags" />
      </div>

      <CreateFeedContainerActions :input="this" />
    </div>
  </main>
</template>

<script lang="ts">
import Post from '@/component/view/Post.vue';

import CreateFeedContainerFiles from './CreateFeedContainerFiles.vue';
import CreateFeedContainerCaption from '@/component/view/createfeed/CreateFeedContainerCaption.vue';
import CreateFeedContainerTags from '@/component/view/createfeed/CreateFeedContainerTags.vue';
import CreateFeedContainerActions, {
  CreateFeedContainerActionsInput,
} from '@/component/view/createfeed/CreateFeedContainerActions.vue';

import { OverlayStateModule, UserStateModule, FeedStateModule } from '@/store';
import { FeedModel, TagModel } from '@/type/api';
import { PostFileHelper, getMediasFromFeedData, util } from '@/util';
import { CreateElement, VNode } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TopicsService } from '@/kuroco_api/services/TopicsService';

@Component<CreateFeedContainer>({
  components: {
    CreateFeedContainerFiles,
    CreateFeedContainerCaption,
    CreateFeedContainerTags,
    CreateFeedContainerActions,
    Post,
  },
})
export default class CreateFeedContainer extends Vue implements CreateFeedContainerActionsInput {
  // PROPS
  @Prop({
    type: String,
    required: true,
  })
  updatePattern!: 'create' | 'update';

  // FIELDS
  UserStateModule = UserStateModule;
  selectedTags: TagModel.Read.Response.List[] = [];
  commentInput = '';
  helper: PostFileHelper = new PostFileHelper();
  renderVimeoOpt: { show: boolean; height?: string } | null = null;
  initializedWith: null | PostFileHelper['mediaType'] = null;
  POSTING_STATUS = POSTING_STATUS;
  postingState: POSTING_STATUS = POSTING_STATUS.PRE;
  imageRotationStyles = this.helper ? this.helper.renderSource.map(() => ({ transform: 'none' })) : [];
  updated: boolean = false;

  // METHODS
  async readFeeds(topicsID: string) {
    const res = await FeedStateModule.loadPage({ id: [Number(topicsID)] }).catch((e: any = {}) => {
      (this as any).$snack.danger({
        text: '該当の記事が見つかりませんでした。',
        button: 'OK',
      });
      this.$router.push({ path: '/' });
      return Promise.reject();
    });
    const targetFeed = res.feed.list[0];

    // if accessed directly to the URL at this component,
    // a user created this topic may not match this current user.
    // hence in this case it possibly allows that any user can edit other user's topic,
    // to prevent it.
    if (targetFeed.member_id !== UserStateModule.selfUser.member_id) {
      (this as any).$snack.danger({
        text: '該当の記事を編集する権限がありません。',
        button: 'OK',
      });
      this.$router.push({ path: '/' });
    }

    return res;
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
    if (!this.helper.confirmOnAdopt(mediaType)) {
      return;
    }
    this.helper.mediaType = mediaType;

    this.postingState = POSTING_STATUS.LOADING;
    const prms =
      mediaType === 'video'
        ? this.helper.adoptVideo(newFile, mediaType)
        : this.helper.adoptImage(newFile, mediaType, idx);
    prms
      // fix rotations
      .then(() => {
        if (mediaType === 'image') {
          util.getOrientation(newFile, (orientationValue: number) => {
            Vue.set(this.imageRotationStyles, idx, {
              transform: util.getTransformValueByExifOrientationInfo(orientationValue),
            });
          });
        }
        this.updated = true;
      })
      .then(() => (this.postingState = POSTING_STATUS.COMPLETE))
      .catch((e) => (this.postingState = POSTING_STATUS.ERROR));
  }

  // LIFECYCLE HOOKS
  created() {
    // routed from navbar.
    switch (this.updatePattern) {
      case 'create':
        this.helper.init();
        this.initializedWith = this.helper.mediaType;
        break;
      case 'update':
        const topicsId = this.$route.params.topics_id;
        this.postingState = POSTING_STATUS.LOADING;

        this.readFeeds(topicsId).then((res) => {
          const targetFeed = res.feed.list[0];
          this.selectedTags = [...this.selectedTags, ...res.tags.map((d) => d.list).flat()];
          this.commentInput = targetFeed.ext_col_02;
          const mediaFiles = res.feed.list.map((feed) => getMediasFromFeedData(feed)).flat();
          this.$nextTick(() => {
            this.helper
              .init(mediaFiles)
              .then(() => (this.initializedWith = this.helper.mediaType))
              .finally(() => (this.postingState = POSTING_STATUS.PRE));
          });
        });
        break;
    }
  }
}

export enum POSTING_STATUS {
  PRE = 'PRE',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}
</script>
