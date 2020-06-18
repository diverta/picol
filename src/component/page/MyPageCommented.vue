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
  title = 'コメントした投稿';
  query: TopicsService.getTopicsServiceRcmsApi1FeedsRequest = {
    myCommentList: 1,
  };
}
</script>
