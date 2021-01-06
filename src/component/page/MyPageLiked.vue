<template>
  <OptionalFeed
    v-bind="{
      title: this.$t('favorited_post'),
      query: { myFavoriteList: 1 },
    }"
  />
</template>

<script lang="ts">
import OptionalFeed from '@/component/view/OptionalFeed.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { TopicsService } from '@/kuroco_api';

@Component<MyPageLiked>({
  components: {
    OptionalFeed,
  },
})
export default class MyPageLiked extends Vue {}
</script>

<i18n locale="ja" lang="json5">
{
  "favorited_post": "いいねした投稿"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "favorited_post": "Liked post"
}
</i18n>
