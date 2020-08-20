<template>
  <div class="c-comment-field">
    <SnackbarCommit
      class="c-comment-field__form"
      :fn="() => addComment(feed)"
      :msg="{
        ok: $t('add_comment'),
        ng: $t('error_occurred'),
      }"
      async
      :useServerErrMsg="true"
      v-slot="{ on, processing }"
    >
      <img :src="UserStateModule.myImage" alt class="c-comment-field__icon" />
      <div
        class="c-comment-field__textarea"
        type="text"
        :contenteditable="!processing"
        data-placeholder="Comment..."
        required
        data-max-length="140"
        ref="editable"
        @paste="checkOverMaxLength"
        @input="checkOverMaxLength"
        @keydown.enter.exact.stop.prevent="on"
      ></div>
      <button
        class="c-comment-field__submit"
        :class="{ 'is-disabled': processing }"
        :disabled="processing"
        @click.prevent="on"
      >
        <TinySpinner v-if="processing"></TinySpinner>
        <span v-else>{{ $t('post') }}</span>
      </button>
    </SnackbarCommit>
  </div>
</template>

<script lang="ts">
import { FeedStateModule } from '@/store/feed';
import { FeedModel } from '@/type/api';
import { CommentModel } from '@/type/api/comment';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserStateModule } from '@/store';
import { ServiceHelper } from '../../../util';
import { CommentsService } from '@/kuroco_api/services/CommentsService';
import { maxlengthContentEditable } from 'maxlength-contenteditable';

@Component<FeedContentCommentForm>({})
export default class FeedContentCommentForm extends Vue {
  // PROPS
  @Prop()
  feed!: FeedModel.Read.Response.Feed;

  // FIELDS
  UserStateModule = UserStateModule;

  // METHODS
  checkOverMaxLength(e: any) {
    const len = (() => {
      const passed =
        e.data?.trim().length ||
        e.clipboardData?.getData('Text')?.trim().length ||
        (window as any).clipboardData?.getData('Text')?.trim().length ||
        0;
      const content = e.target.innerText.length;

      return passed + content;
    })();

    if (len > 140) {
      this.$snack.danger({ text: this.$t('place_holder') });
    }
  }
  async addComment(feed: FeedModel.Read.Response.Feed) {
    const note = (this.$refs.editable as any).innerText.trim() as string;

    const comment: CommentsService.postCommentsServiceRcmsApi1CommentCreateRequest = {
      requestBody: {
        note,
        name: UserStateModule.selfUser.nickname as string,
        module_id: feed.topics_id,
      },
    };

    await FeedStateModule.createComment(comment).then(() => {
      (this.$refs.editable as any).innerText = '';
      this.$emit('commit-change');
    });
  }

  // LYFECYCLE HOOKS
  mounted() {
    /**
     * executes maxlength attribute for contenteditable div element.
     * @see https://github.com/stephen31/maxlength-contenteditable
     */
    maxlengthContentEditable();
  }
}
</script>
<i18n locale="ja" lang="json5">
{
  "post": "投稿する",
  "error_occurred": "エラーが発生しました。",
  "place_holder": "本文は140文字以内で入力してください。",
  "add_comment": "コメントを追加しました。",
  "post_tag_errMsg": "タグの投稿に失敗しました。<br>電波状況などが悪い可能性があります。<br>電波状況をご確認の上、再度お試しください。"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "post": "Post",
  "error_occurred": "An error has occurred.",
  "place_holder": "Please input the text within 140 characters.",
  "add_comment": "The comment was added.",
  "post_tag_errMsg": "Could not post the tag. <br>Your network condition may be bad. <br>Please check your network condition and try again."
}
</i18n>
