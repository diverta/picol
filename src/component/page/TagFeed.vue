<template>
  <OptionalFeed
    v-if="this.$route.query"
    :title="this.$route.query.title"
    :query="{
      tagId: [Number(this.$route.query.tag_id)],
    }"
  />
</template>

<script lang="ts">
import OptionalFeed from '@/component/view/OptionalFeed.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ContentService } from '@/kuroco_api';

@Component<TagFeed>({
  components: {
    OptionalFeed,
  },
})
export default class TagFeed extends Vue {}
</script>
