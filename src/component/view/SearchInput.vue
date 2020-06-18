<template>
  <div class="p-search__header">
    <div class="p-search__header-body">
      <div class="p-search__search-wrapper">
        <input
          type="search"
          class="p-search__search"
          placeholder="タグ・キーワード検索"
          :value="queryText"
          @input="
            (e) => {
              dirty = true;
              handleOnInputChangeWrapper(e);
            }
          "
          @change="
            (e) => {
              dirty = true;
              handleInputChange(e);
            }
          "
          @keydown="(e) => modifiers.enter(handleOnEnter)"
          @blur="
            (e) => {
              if (dirty) {
                handleOnBlur(e);
              }
            }
          "
        />
        <button type="submit" class="p-search__search-submit is-disabled" disabled>Search</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import { modifiers } from 'vue-tsx-support';

@Component<SearchInput>({
  components: {},
})
export default class SearchInput extends Vue {
  // PROPS
  @Prop({ type: Function, required: true })
  handleInputChange!: (e: any) => void;
  @Prop({ type: Function, required: true })
  handleOnBlur!: (e: any) => void;
  @Prop({ type: Function, required: true })
  debouncedRefresh!: () => void;
  @Prop({ type: Function, required: true })
  handleOnEnter!: (e: any) => void;
  @Prop({ type: String, required: true })
  searchQuery!: string;

  // FIELDS
  dirty = false;
  modifiers = modifiers;

  // MUTATIONS
  get queryText() {
    return this.searchQuery;
  }

  // METHODS
  handleOnInputChangeWrapper(e: any) {
    this.handleInputChange(e);
    this.debouncedRefresh();
  }
}
</script>
