<template>
  <div>
    <dl class="c-section" v-for="(tagDef, tagDefIdx) in tagDefs" :key="tagDefIdx">
      <dt class="c-section__title">{{ tagDef.category_name }}</dt>
      <dd class="c-section__body">
        <div class="c-hash-list">
          <ul class="c-hash-list__items">
            <li class="c-hash-list__item" v-for="(tag, tagIdx) in tagDef.list" :key="tagIdx">
              <button class="c-hash-list__link" @click.prevent="() => handleClickAddTag(tag)">#{{ tag.tag_nm }}</button>
            </li>
          </ul>
        </div>
      </dd>
    </dl>
    <TinySpinner v-if="isProcessing"></TinySpinner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TagCategoryStateModule, TagCategoryGroupedTagList } from '@/store';
import { TagCategoryModel } from '@/type/api';

@Component<Tags>({
  components: {},
})
export default class Tags extends Vue {
  // PROPS
  @Prop({
    type: Function,
    default: () => {
      /** NP */
    },
  })
  handleClickAddTag!: (tag: TagCategoryModel.Read.Response.List) => void;

  // FIELDS
  TagCategoryStateModule = TagCategoryStateModule;
  isProcessing = false;

  // MUTATIONS
  get tagDefs() {
    return TagCategoryStateModule.sortedTagDefs;
  }
}
</script>
