<template>
  <div class="c-log">
    <p v-if="comments.length > 0" class="c-log__note">{{ $t('description_of_activity') }}</p>
    <ul class="c-log__items">
      <li v-for="(data, idx) in comments" :key="idx" class="c-log__item">
        <router-link-ext :to="{ name: 'feedDetail', query: { topics_id: data.module_id } }" exact>
          <a class="c-log__body">
            <p class="c-log__user-icon-wrapper">
              <img :src="getAvaterSrc(data.member_id)" alt class="c-log__user-icon" />
            </p>
            <div class="c-log__content">
              <p class="c-log__date">{{ getHowLongBeforePostedData(data.update_ymdhi) }}</p>
              <p class="c-log__text">
                <span class="c-log__name">
                  <span class="c-log__name--name">{{ getUserName(data.member_id) }}</span
                  >{{ $t('sanga') }}
                </span>
                {{ getWitchPost(data) }} {{ $t('commented') }}
              </p>
              <p class="c-log__entry">{{ (data.note || '').trim() }}</p>
            </div>
          </a>
        </router-link-ext>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import { UserStateModule } from '@/store';
import { CONSTANTS } from '@/core';
import { FavoriteMyListModel, CommentModel } from '../../type';
import { ExtendedCommentList } from '../page/Activity.vue';

@Component<ActivityContainer>({})
export default class ActivityContainer extends Vue {
  // PROPS
  @Prop({ type: Array, default: () => [] })
  comments!: ExtendedCommentList[];

  // MUTATIONS
  get getUserName() {
    return UserStateModule.getUserName;
  }
  get memberInfo() {
    return UserStateModule.selfUser;
  }
  get getAvaterSrc() {
    return UserStateModule.getImage;
  }

  // METHODS
  getWitchPost(extendedComment: ExtendedCommentList) {
    switch (extendedComment.type) {
      case 'POSTED':
        return this.$t('your_post');
      case 'FAV':
        return this.$t('your_favoraited_post');
    }
  }
}
</script>
<i18n locale="ja" lang="json5">
{
  "description_of_activity": "直近１ヶ月のACTIVITYを表示しています。",
  "sanga": "さんが、",
  "commented": "にコメントしました。",
  "your_post": "あなたの投稿",
  "your_favoraited_post": "あなたがいいね！した投稿"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "description_of_activity": "The activity for the last month.",
  "sanga": "",
  "commented": "commented.",
  "your_post": "Your post",
  "your_favoraited_post": "Your liked post"
}
</i18n>
