<template>
  <OptionalFeed
    v-bind="{
      title: this.$t('commented_post'),
      query: { myCommentList: 1 },
    }"
  />
</template>

<script lang="ts">
import OptionalFeed from '@/component/view/OptionalFeed.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component<MyPageCommented>({
  components: {
    OptionalFeed,
  },
})
export default class MyPageCommented extends Vue {}
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
