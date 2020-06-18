<template>
  <div class="c-entry__like-button-wrapper">
    <disable-dbclick-button
      :class="{ 'c-entry__like-button': true, 'is-on': feed.my_favorite_flg }"
      :onclick="handleClickFavorite"
      >like</disable-dbclick-button
    >
    <div class="icons-wrapper">
      <font-awesome-icon v-if="isMyFeed" class="icon" :icon="['far', 'edit']" @click.prevent="handleClickEdit" />
      <font-awesome-icon v-if="isMyFeed" class="icon" :icon="['far', 'trash-alt']" @click.prevent="handleClickRemove" />
    </div>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { FeedStateModule, UserStateModule } from '@/store/';
import { FeedModel } from '@/type';

@Component<FeedContentButtonsContainer>({})
export default class FeedContentButtonsContainer extends Vue {
  // PROPS
  @Prop({ type: Object, required: true })
  feed!: FeedModel.Read.Response.Feed;
  @Prop({
    type: Function,
    required: false,
    default: () => {
      /** NP */
    },
  })
  onChangeFeed!: () => void;

  // MUTATIONS
  get isMyFeed() {
    return UserStateModule.selfUser.member_id === this.feed.member_id;
  }

  // METHODS
  handleClickFavorite() {
    const newFav = !this.feed.my_favorite_flg;

    return (newFav
      ? FeedStateModule.setFavorite({
          requestBody: { module_type: 'topics', module_id: this.feed.topics_id },
        })
      : FeedStateModule.removeFavorite({
          requestBody: { module_type: 'topics', module_id: this.feed.topics_id },
        })
    )
      .then(() => {
        this.onChangeFeed();
        (this as any).$snack.success({ text: newFav ? 'いいね！しました。' : 'いいね！を外しました。', button: 'OK' });
      })
      .catch(() => (this as any).$snack.danger({ text: 'エラーが発生しました。', button: 'OK' }));
  }
  handleClickRemove() {
    if (window.confirm('記事を削除してもよろしいですか？')) {
      FeedStateModule.removeFeed({ topicsId: this.feed.topics_id })
        .then(() => (this as any).$snack.success({ text: '記事を削除しました。', button: 'OK' }))
        .catch(() => (this as any).$snack.danger({ text: 'エラーが発生しました。', button: 'OK' }));

      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' });
      }
    }
  }
  handleClickEdit() {
    const topics_id = `${this.feed.topics_id}` as string;
    this.$router.push({ name: 'postWithArguments', params: { topics_id } });
  }

  // LIFECYCLE HOOKS
  mounted() {
    dom.watch();
  }
}
</script>

<style scoped>
.icons-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  color: #24273a66;
  justify-content: flex-end;
}
.icon {
  cursor: pointer;
  margin-left: 1em;
  font-size: 23px;
}
.icon:hover {
  color: #000;
}
</style>
