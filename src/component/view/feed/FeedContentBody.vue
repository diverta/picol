<template>
  <div class="c-entry__body--content-link" :class="isDetail ? '' : 'pointer'" @click="handleOnClickBody">
    <p v-if="$route.path === '/'" v-trim v-sanitize>{{ feed.ext_col_02 }}</p>
    <p v-else v-sanitize>{{ feed.ext_col_02 }}</p>
  </div>
</template>

<script lang="ts">
import { TrimDirective, SanitizeDirective } from '@/directive';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FeedModel } from '@/type';

@Component<FeedContentBody>({
  directives: { TrimDirective, SanitizeDirective },
})
export default class FeedContentBody extends Vue {
  // PROPS
  @Prop({ type: Object, required: true })
  feed!: FeedModel.Read.Response.Feed;

  // MUTATIONS
  get isDetail() {
    return this.$route.path === '/sub/feed';
  }

  // METHODS
  handleOnClickBody(e: any) {
    if (!this.isDetail) {
      this.$router.push({ name: 'feedDetail', query: { topics_id: `${this.feed.topics_id}` } });
    }
  }
}
</script>
