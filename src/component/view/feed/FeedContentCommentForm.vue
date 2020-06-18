<template>
  <div class="c-comment-field">
    <div class="c-comment-field__form">
      <img :src="myAvatarSrc" alt class="c-comment-field__icon" />
      <div
        class="c-comment-field__textarea"
        type="text"
        contenteditable="true"
        data-placeholder="Comment..."
        required
        maxlength="140"
        ref="editable"
        @input="onInput"
        @keydown="(event) => handleOnKeyDown(event)"
        @keyup.enter.prevent="(event) => handleOnKeyUp(event, feed)"
      ></div>
      <disable-dbclick-button
        :class="{ 'c-comment-field__submit': true, 'is-disabled': isDisabled }"
        :disabled="isDisabled"
        :onclick="() => handleOnClickAdd(feed)"
      >
        <span v-if="isProcessing === false">投稿する</span>
        <TinySpinner v-else></TinySpinner>
      </disable-dbclick-button>
    </div>
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

const errMsg = `
        タグの投稿に失敗しました。
        電波状況などが悪い可能性があります。
        電波状況をご確認の上、再度お試しください。
      `;

@Component<FeedContentCommentForm>({})
export default class FeedContentCommentForm extends Vue {
  // PROPS
  @Prop()
  feed!: FeedModel.Read.Response.Feed;
  @Prop({
    type: Function,
    required: false,
    default: () => {
      /** NP */
    },
  })
  onChangeFeed!: () => void;

  // FIELDS
  isProcessing = false;
  keyDownCode = 0;
  /**
   * due to detect the button is clickable or not.
   */
  content = '';

  // MUTATIONS
  get myAvatarSrc(): string {
    return UserStateModule.myImage;
  }
  get isDisabled(): boolean {
    return this.isProcessing || this.content.trim() === '';
  }
  get selfUser() {
    return UserStateModule.selfUser;
  }

  onInput(e: any) {
    const inputStr = e.target.innerText.trim();
    if (inputStr.length > 140) {
      e.target.innerText = this.content;
      e.preventDefault();
      (this as any).$snack.danger({ text: '本文は140文字以内で入力してください。', button: 'OK' });
      return;
    }
    this.content = inputStr;
  }
  clearInput() {
    (this.$refs.editable as any).innerText = '';
    this.content = '';
  }
  handleOnKeyDown(e: any) {
    this.keyDownCode = e.keyCode;
  }
  // handles Enter keyUp event
  handleOnKeyUp(e: any, feed: FeedModel.Read.Response.Feed) {
    if (this.isDisabled) {
      return;
    }
    if (e.keyCode && e.keyCode === 13) {
      // for considering making a new line.
      if (e.shiftKey) {
        return;
      }
      // for considering the case of conversion key + enter key pressed.
      // at only enter key (for post comment) pressed, keyCode and keyDownCode are the equal.
      if (e.keyCode !== this.keyDownCode) {
        return;
      }

      this.addComment(feed);
      e.preventDefault();
      e.stopPropagation();
    }
  }
  handleOnClickAdd(feed: FeedModel.Read.Response.Feed) {
    return this.addComment(feed);
  }
  addComment(feed: FeedModel.Read.Response.Feed) {
    const note = (this.$refs.editable as any).innerText.trim() as string;

    const comment: CommentsService.postCommentsServiceRcmsApi1CommentCreateRequest = {
      requestBody: {
        note,
        name: UserStateModule.selfUser.nickname as string,
        module_id: feed.topics_id,
      },
    };

    this.isProcessing = true;

    return this.feedPostComment(comment)
      .then(() => this.clearInput())
      .then(() => this.onChangeFeed())
      .finally(() => (this.isProcessing = false));
  }
  feedPostComment(query: CommentsService.postCommentsServiceRcmsApi1CommentCreateRequest) {
    return FeedStateModule.createComment(query)
      .then(() => {
        (this as any).$snack.success({ text: 'コメントを追加しました。', button: 'OK' });
        return Promise.resolve();
      })
      .catch((e: any) => {
        const isTooManyCommentsInShortTerm = /send many comments/gi.test(e.getValue(['response', 'data', 'errors', 0]));

        (this as any).$snack.danger({
          text: isTooManyCommentsInShortTerm
            ? '短期間に複数のリクエストがありました。\n時間をおいてから再度コメントしてください。'
            : 'エラーが発生しました。',
          button: 'OK',
        });
        return Promise.reject();
      });
  }
}
</script>
