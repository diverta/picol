<template>
  <div :class="this.editable ? ['p-post__hash-editable'] : ['p-post__hash']">
    <!-- header -->
    <dl class="c-section">
      <dt v-if="title !== undefined" class="c-section__title">{{ $t('attach_tag') }}</dt>
      <dd class="c-section__body">
        <div v-if="editable" class="p-post__hash-input-wrapper">
          <input type="text" :placeholder="$t('attach_tag')" class="p-post__hash-input" v-model="tagInput" />

          <SnackbarCommit
            :fn="() => addInputTag(tagInput)"
            :msg="{
              ok: `#${tagInput} ${$t('added_to_undefined')}`,
              ng: $t('cant_add_tag'),
            }"
            :useServerErrMsg="true"
          >
            <template #activator="{ on }">
              <button class="p-post__hash-add" @click.prevent="on">
                {{ $t('add') }}
              </button>
            </template>
          </SnackbarCommit>
        </div>
        <!-- tag buttons -->
        <div class="p-post__hash-items">
          <button
            v-for="(tag, idx) in selectedTagsCopy"
            :key="idx"
            class="p-post__hash-item"
            @click.prevent="() => handleClickDeleteTag(tag)"
          >
            #{{ getTagName(tag) }}
          </button>
        </div>
      </dd>
    </dl>
    <Tags :handleClickAddTag="handleClickAddTag" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { TagModel } from '@/type/api';
import { CreateElement, VNode } from 'vue';
import { TagStateModule, TagCategoryStateModule } from '@/store';
import Tags from './Tags.vue';

@Component<Tag>({
  components: { Tags },
})
export default class Tag extends Vue {
  // PROPS
  @Prop({ type: String, default: undefined })
  title!: string;
  @Prop({ type: Boolean, default: false })
  editable!: boolean;
  @Prop({ type: Array, default: () => [] })
  selectedTags!: TagModel.Read.Response.List[];
  /** suold be selected tags on initialize. optional. */
  @Prop({ type: Array, default: () => [] })
  specTagIDs!: string[];

  // FIELDS
  TagCategoryStateModule = TagCategoryStateModule;
  TagStateModule = TagStateModule;
  tagInput = '';
  isProcessing = false;

  // MUTATIONS
  get selectedTagsCopy(): TagModel.Read.Response.List[] {
    return this.selectedTags;
  }
  get getTagName() {
    return (tagDef: TagModel.Read.Response.List) =>
      !!tagDef && !!tagDef.tag_nm ? tagDef.tag_nm : this.$t('undefined');
  }

  // METHODS
  @Watch('specTagIDs', { immediate: true })
  onSpecTagIDsChanged(cur: string[], old: string[]) {
    (cur || []).forEach((specTagID) => {
      const finded = this.TagStateModule.allTags.find((tag) => tag.tag_id === Number(specTagID));
      if (!!finded) {
        this.selectedTags.push(finded);
      }
    });
  }
  handleClickAddTag(tag: TagModel.Read.Response.List) {
    if (this.selectedTags.map((tag) => tag.tag_id).includes(tag.tag_id)) {
      this.$snack.danger({ text: this.$t('already_added'), button: 'OK' });
      return;
    }
    this.$emit('change', tag);
  }
  async addInputTag(tagInput: string) {
    await this.requestAddTag({ tagInput });
    this.tagInput = '';
  }
  handleClickDeleteTag(tag: TagModel.Read.Response.List) {
    const idx = this.selectedTagsCopy.findIndex((t) => t.tag_id === tag.tag_id);
    this.$emit('delete', idx);
  }
  requestAddTag(query: { tagInput: string }) {
    const q = { requestBody: { tag_nm: query.tagInput, open_type: 'open' as 'open' } };
    return TagCategoryStateModule.addTagCategory(q).then(() => TagCategoryStateModule.readAll());
  }

  // LYCYCLE HOOKS
  mounted() {
    if (this.TagCategoryStateModule.tagDefs.length === 0) {
      this.isProcessing = true;
      TagCategoryStateModule.readAll().finally(() => (this.isProcessing = false));
    }
  }
}
</script>
<i18n locale="ja" lang="json5">
{
  "attach_tag": "タグをつける",
  "already_added": "すでに追加済みです。",
  "undefined": "未分類",
  "cant_add_tag": "タグを追加できませんでした。",
  "added_to_undefined": "を未分類に追加しました。",
  "add": "追加"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "attach_tag": "Attach tags",
  "already_added": "Already added",
  "undefined": "Undefined",
  "cant_add_tag": "Can't add tag.",
  "added_to_undefined": "added to undefined.",
  "add": "Add"
}
</i18n>
