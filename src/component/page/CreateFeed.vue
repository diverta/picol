<template>
  <div class="l-wrapper" id="app">
    <CreateFeedContainer v-if="updatePattern" :updatePattern="updatePattern" />
  </div>
</template>

<script lang="ts">
import CreateFeedContainer from '@/component/view/createfeed/CreateFeedContainer.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component<CreateFeed>({
  components: {
    CreateFeedContainer,
  },
})
export default class CreateFeed extends Vue {
  // FIELDS
  updatePattern?: 'create' | 'update';

  // LIFECYCLE HOOKS
  created() {
    this.updatePattern = !this.$route.params || !this.$route.params.topics_id ? 'create' : 'update';
  }
}
</script>
