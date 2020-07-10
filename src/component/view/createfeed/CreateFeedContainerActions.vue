<template>
  <div class="p-post__action">
    <a href="/" class="p-post__prev" @click.prevent="() => $router.back()">{{ $t('back') }}</a>
    <button class="p-post__submit" @click.prevent="handleOnClickEditPost">{{ $t('post') }}</button>

    <Post :shows.sync="showsPost" :requestFn="requestFn" />
  </div>
</template>

<script lang="ts">
import Post from '@/component/view/Post.vue';

import { FeedStateModule } from '@/store';
import { TagModel } from '@/type/api';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TopicsService } from '@/kuroco_api';
import truncate from 'lodash/truncate';
import { PostFileHelper } from '@/util';

@Component<CreateFeedContainerActions>({
  components: {
    Post,
  },
})
export default class CreateFeedContainerActions extends Vue {
  // PROPS
  @Prop({
    type: Object,
    required: true,
  })
  input!: CreateFeedContainerActionsInput;

  // FIELDS
  requestFn: () => Promise<any> = () => Promise.resolve();
  showsPost = false;

  // METHODS
  handleOnClickEditPost(e: Event): void {
    if (this.input.commentInput === '') {
      this.$snack.show({ text: this.$t('input_caption') });
      return;
    }
    this.uploadTopic();
  }
  uploadTopic() {
    const { commentInput, selectedTags, helper, updatePattern } = this.input;

    const requestBody: Extract<
      TopicsService.postTopicsServiceRcmsApi1FeedCreateRequest['requestBody'],
      TopicsService.postTopicsServiceRcmsApi1FeedUpdateTopicsIdRequest['requestBody']
    > = {
      ymd: new Date().toISOString().substr(0, 10),
      contents_type: 1 as 1,
      subject: truncate(commentInput, { length: 20 }),
      open_type: 'open' as 'open',
      topics_flg: 1 as 1,
      tag_id: selectedTags.map((t) => t.tag_id) as any,
      ext_col_02: truncate(commentInput, { length: 2000 }),
      ext_col_04: helper.preparedDataToRequest.image, // images
      ext_col_06: helper.preparedDataToRequest.video, // video
    };

    switch (updatePattern) {
      case 'create':
        this.requestFn = () => FeedStateModule.createFeed({ requestBody });
        break;
      case 'update':
        this.requestFn = () =>
          FeedStateModule.updateFeed({
            requestBody,
            topicsId: Number(this.$route.params.topics_id),
          });
        break;
    }
    this.showsPost = true;
  }
}

export interface CreateFeedContainerActionsInput {
  commentInput: string;
  selectedTags: TagModel.Read.Response.List[];
  helper: PostFileHelper;
  updatePattern: 'create' | 'update';
}
</script>
<i18n locale="ja" lang="json5">
{
  "back": "戻る",
  "post": "投稿する",
  "input_caption": "キャプションを入力してください。"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "back": "Back",
  "post": "Post",
  "input_caption": "Please input caption."
}
</i18n>
