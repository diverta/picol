<template>
  <OptionalFeed :title="title" :query="query" />
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
export default class MyPageLiked extends Vue {
  // FIELDS
  title = this.$t('favorited_post');
  query: TopicsService.getTopicsServiceRcmsApi1FeedsRequest = {
    myFavoriteList: 1,
  };
}
</script>
<i18n locale="ja" lang="json5">
{
  "favorited_post": "いいねした投稿"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "favorited_post": "Favorited post"
}
</i18n>
