<template>
  <div class="c-comment-list">
    <dl class="c-comment-list__item" v-for="comment in comments" :key="comment.comment_id">
      <dt class="c-comment-list__name">
        <a href="#" class="c-comment-list__name-link">{{ getCommentAuthorName(comment.member_id) }}</a>
      </dt>
      <dd class="c-comment-list__comment" v-sanitize>{{ comment.note }}</dd>
      <dd
        v-if="getIsSameMember(comment)"
        class="c-comment-list__delete-button"
        @click.prevent="handleClickRemoveComment(comment.comment_id)"
      >
        <font-awesome-icon :icon="['far', 'times-circle']" />
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { UserStateModule, FeedStateModule } from '@/store';
import { CommentModel } from '@/type/api/comment';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ServiceHelper } from '../../../util';

@Component<FeedContentComments>({})
export default class FeedContentComments extends Vue {
  // PROPS
  @Prop({ type: Number, required: true })
  topicsID!: number;
  @Prop({ type: Array, required: true })
  comments!: CommentModel.Read.Response.List[];
  @Prop({
    type: Function,
    required: false,
    default: () => {
      /** NP */
    },
  })
  onChangeFeed!: () => void;

  // FIELDS
  UserStateModule = UserStateModule;

  // MUTATIONS
  get selfUser() {
    return UserStateModule.selfUser;
  }
  get getIsSameMember() {
    return (comment: CommentModel.Read.Response.List) => `${comment.member_id}` === `${this.selfUser.member_id}`;
  }
  get getCommentAuthorName() {
    return (memberID: number) => UserStateModule.getUserName(memberID);
  }

  // METHODS
  handleClickRemoveComment(commentID: number) {
    FeedStateModule.removeComment({ requestBody: { comment_id: commentID }, moduleId: this.topicsID })
      .then(() => this.onChangeFeed())
      .then(() => (this as any).$snack.success({ text: 'コメントを削除しました。', button: 'OK' }))
      .catch(() => (this as any).$snack.danger({ text: 'エラーが発生しました。', button: 'OK' }));
  }
}
</script>

<style lang="sass" scoped>
.c-comment-list__delete-button
  font-size: 14px
  margin: auto
  cursor: pointer
  color: #24273a66
  &:hover
    color: #000
</style>
