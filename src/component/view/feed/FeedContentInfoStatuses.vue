<template>
  <div class="c-entry__status">
    <dl class="c-entry__status-item" v-for="(status, idx) in statuses" :key="idx">
      <dt class="c-entry__status-title">{{ status.name }}</dt>
      <dd class="c-entry__status-count">{{ status.cnt }}</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<FeedContentInfoStatuses>({})
export default class FeedContentInfoStatuses extends Vue {
  // PROPS
  @Prop({ type: Array, default: () => [] })

  // FIELDS
  statuses!: FeedInfoStatus[];
}

export interface FeedInfoStatus {
  name: string;
  cnt: number;
}
</script>
