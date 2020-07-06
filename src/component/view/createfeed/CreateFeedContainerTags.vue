<template>
  <Tag
    :editable="true"
    :selectedTags="selectedTags"
    @change="
      (tag) => {
        selectedTags.push(tag);
        this.$emit('update:selectedTags', selectedTags);
      }
    "
    @delete="
      (idx) => {
        selectedTags.splice(idx, 1);
        this.$emit('update:selectedTags', selectedTags);
      }
    "
  />
</template>

<script lang="ts">
import Tag from '@/component/view/Tag.vue';
import { TagStateModule } from '@/store';
import { TagModel } from '@/type/api';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component<CreateFeedContainerTags>({
  components: {
    Tag,
  },
})
export default class CreateFeedContainerTags extends Vue {
  // PROPS
  @Prop({
    type: Array,
    required: false,
    default: () => [],
  })
  selectedTags!: TagModel.Read.Response.List[];
}
</script>
