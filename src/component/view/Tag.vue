<template>
  <div :class="this.editable ? ['p-post__hash-editable'] : ['p-post__hash']">
    <!-- header -->
    <dl class="c-section">
      <dt v-if="title !== undefined" class="c-section__title">タグをつける</dt>
      <dd class="c-section__body">
        <div v-if="editable" class="p-post__hash-input-wrapper">
          <input type="text" placeholder="タグ入力" class="p-post__hash-input" v-model="tagInput" />
          <button class="p-post__hash-add" @click.prevent="() => handleClickAddInputTag(tagInput)">追加</button>
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
    return (tagDef: TagModel.Read.Response.List) => (!!tagDef && !!tagDef.tag_nm ? tagDef.tag_nm : '未分類');
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
      (this as any).$snack.danger({ text: 'すでに追加済みです。', button: 'OK' });
      return;
    }
    this.$emit('change', tag);
  }
  handleClickAddInputTag(tagInput: string) {
    this.requestAddTag({ tagInput })
      .then((d) => (this.tagInput = ''))
      .then(() => (this as any).$snack.success({ text: `#${tagInput} を未分類に追加しました。`, button: 'OK' }))
      .catch(async (e) => {
        let errMsg = 'タグを追加できませんでした。';

        try {
          const err = await e.json();
          if (
            err.errors instanceof Array &&
            err.errors.length > 0 &&
            ['Title is specified more than once', 'タイトルが重複しています'].some((errMsgDef) =>
              err.errors[0].includes(errMsgDef),
            )
          ) {
            errMsg = `#${tagInput} はすでに存在しています。`;
          }
        } catch (e) {
          /** NP */
        }

        (this as any).$snack.danger({
          text: errMsg,
          button: 'OK',
        });
      });
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
