<template>
  <OptionalFeed :title="title" :query="query" />
</template>

<script lang="ts">
import OptionalFeed from '@/component/view/OptionalFeed.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { TopicsService } from '@/kuroco_api';

@Component<MyPageCommented>({
  components: {
    OptionalFeed,
  },
})
export default class MyPageCommented extends Vue {
  // FIELDS
  title = this.$t('commented_post');
  query: TopicsService.getTopicsServiceRcmsApi1FeedsRequest = {
    myCommentList: 1,
  };
}
</script>
<i18n locale="ja" lang="json5">
{
  "commented_post": "コメントした投稿"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "commented_post": "Commented post"
}
</i18n>
