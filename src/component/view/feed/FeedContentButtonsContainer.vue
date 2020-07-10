<template>
  <div class="c-entry__like-button-wrapper">
    <SnackbarCommit
      :fn="favorite"
      :msg="{
        ok: feed.my_favorite_flg ? $t('removed') : $t('liked'),
      }"
      v-slot="{ on, processing }"
    >
      <button
        :disabled="processing"
        :class="{ 'c-entry__like-button': true, 'is-on': feed.my_favorite_flg }"
        @click="on"
      >
        like
      </button>
    </SnackbarCommit>
    <div class="icons-wrapper">
      <font-awesome-icon v-if="isMyFeed" class="icon" :icon="['far', 'edit']" @click.prevent="handleClickEdit" />

      <SnackbarCommit
        :fn="remove"
        :msg="{
          ok: $t('deleted'),
        }"
        :confirmMsg="$t('are_you_sure_to_delete_this')"
        v-slot="{ on }"
      >
        <font-awesome-icon v-if="isMyFeed" class="icon" :icon="['far', 'trash-alt']" @click.prevent="on" />
      </SnackbarCommit>
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
  async favorite() {
    const newFav = !this.feed.my_favorite_flg;

    await (this.feed.my_favorite_flg
      ? FeedStateModule.removeFavorite({
          requestBody: { module_type: 'topics', module_id: this.feed.topics_id },
        })
      : FeedStateModule.setFavorite({
          requestBody: { module_type: 'topics', module_id: this.feed.topics_id },
        }));
    this.onChangeFeed();
  }
  async remove() {
    await FeedStateModule.removeFeed({ topicsId: this.feed.topics_id }).then(() => {
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' });
      }
    });
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
<i18n locale="ja" lang="json5">
{
  "liked": "いいね！しました。",
  "removed": "いいね！を外しました。",
  "error_occurred": "エラーが発生しました。",
  "are_you_sure_to_delete_this": "記事を削除してもよろしいですか？",
  "deleted": "記事を削除しました。"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "liked": "Liked.",
  "removed": "Rmoved.",
  "error_occurred": "An error has occured.",
  "are_you_sure_to_delete_this": "Are you sure to delete this?",
  "deleted": "Deleted."
}
</i18n>
