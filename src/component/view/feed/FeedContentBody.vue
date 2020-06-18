<template>
  <component
    :is="$route.path === '/' ? 'router-link-ext' : 'div'"
    :to="{ name: 'feedDetail', query: { topics_id: feed.topics_id } }"
    class="c-entry__body--content-link"
    exact
  >
    <div class="c-entry__body--content-link">
      <p v-if="$route.path === '/'" v-trim v-sanitize>{{ feed.ext_col_02 }}</p>
      <p v-else v-sanitize>{{ feed.ext_col_02 }}</p>
    </div>
  </component>
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
}
</script>
