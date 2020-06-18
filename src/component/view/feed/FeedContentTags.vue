<template>
  <div class="c-hash-list">
    <ul class="c-hash-list__items">
      <li class="c-hash-list__item" v-for="(tag, idx) in tags" :key="idx">
        <router-link-ext
          :to="{
            name: 'tagFeed',
            query: {
              title: `#${tag.tag_nm}`,
              tag_id: tag.tag_id,
            },
          }"
        >
          <a class="c-hash-list__link">#{{ tag.tag_nm }}</a>
        </router-link-ext>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<FeedContentTags>({})
export default class FeedContentTags extends Vue {
  // PROPS
  @Prop({ type: Array, default: () => [] })

  // FIELDS
  tags!: TagModel.Read.Response.List[];
}
</script>
