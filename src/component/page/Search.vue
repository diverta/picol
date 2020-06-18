<template>
  <div class="l-wrapper" id="app">
    <main class="l-main">
      <div class="p-search">
        <SearchInput
          :handleInputChange="handleInputChange"
          :handleOnBlur="handleOnBlur"
          :searchQuery="searchQuery"
          :debouncedRefresh="debouncedRefresh"
          :handleOnEnter="handleOnEnter"
        />

        <Tag
          :selectedTags="selectedTags"
          @change="onSelectedTagsChenged"
          @delete="onDeleteTag"
          :specTagIDs="specTagIDs"
        />

        <ImageList :feeds="list" :pageID="pageID" />
        <CustomInfiniteLoader
          v-if="initialLoaded"
          :infiniteHandler="infiniteHandler"
          ref="Infinite"
          :messageMarginStyle="messageMarginStyle"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import CustomInfiniteLoader from '@/component/atom/CustomInfiniteLoader.vue';
import ImageList from '@/component/view/ImageList.vue';
import SearchInput from '@/component/view/SearchInput.vue';
import Tag from '@/component/view/Tag.vue';
import { UserStateModule, TagStateModule, TagCategoryStateModule } from '@/store';
import { FeedStateModule } from '@/store/feed';
import { FeedModel, TagModel } from '@/type/api';
import { debounce } from 'lodash';
import { CreateElement, VNode } from 'vue';
import { StateChanger } from 'vue-infinite-loading';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { CONSTANTS } from '@/core';
import { TopicsService } from '@/kuroco_api/services/TopicsService';

@Component<Search>({
  components: {
    ImageList,
    CustomInfiniteLoader,
    Tag,
    SearchInput,
  },
})
export default class Search extends Vue {
  // FIELDS
  pageID = 1;
  totalPageCnt?: number;
  list: FeedModel.Read.Response.Feed[] = [];
  selectedTags: TagModel.Read.Response.List[] = [];
  searchQuery: string = '';
  specTagIDs: string[] = [];
  query: TopicsService.getTopicsServiceRcmsApi1FeedsRequest = {};
  initialLoaded = false;
  messageMarginStyle = {
    margin: '40px 0',
  };
  /** var syntax binding for enable rodash.debounce function. */
  debouncedRefresh = debounce(this.refresh, 500);

  // METHODS
  infiniteHandler($state: StateChanger): void {
    if (this.totalPageCnt !== undefined && this.totalPageCnt < this.pageID) {
      $state.complete();
      return;
    }
    FeedStateModule.loadPage({ ...this.query, pageId: this.pageID })
      .then(({ feed }) => {
        const { list, pageInfo } = feed;
        this.list.push(...list);
        this.totalPageCnt = pageInfo.totalPageCnt;
        this.pageID += 1;
      })
      .then(() => $state.loaded())
      .catch((e) => (e === CONSTANTS.APP_ERROR.NO_DATA ? $state.complete() : $state.error()));
  }
  handleInputChange(e: any) {
    this.searchQuery = e.target.value;
  }
  handleOnEnter(e: any) {
    this.searchQuery = e.target.value;
    this.refresh();
  }
  onDeleteTag(idx: number) {
    this.selectedTags.splice(idx, 1);
    this.refresh();
  }
  onSelectedTagsChenged(tag: TagModel.Read.Response.List) {
    this.selectedTags.push(tag);
    this.refresh();
  }
  handleOnBlur(e: any) {
    this.searchQuery = e.target.value;
    this.refresh();
  }
  async load() {
    const { tag_id, tag_nm, topics_keyword } = this.$route.query;

    let tagIDs;
    if (this.exists(tag_id)) {
      await TagCategoryStateModule.readAll();
      tagIDs = Array.isArray(tag_id) ? tag_id : [tag_id];
      this.specTagIDs = tagIDs as string[];

      tagIDs.map((id) => TagCategoryStateModule.getTags(Number(id))).forEach((v) => this.selectedTags.push(v[0]));
    }
    if (this.exists(topics_keyword)) {
      this.searchQuery = topics_keyword as string;
    }

    // remove undefined or null props
    const query = { tagId: tagIDs, tagNm: tag_nm, topicsKeyword: topics_keyword };
    this.query = query.removeEmpty({ removeEmptyString: true, removeNull: true });

    this.initialLoaded = true;
  }
  async refresh() {
    /** reset state */
    this.pageID = 1;
    this.totalPageCnt = undefined;
    this.list = [];

    /** re-route */
    this.$router.push({
      name: this.$route.name as string,
      query: this.getQueryByInput() as any,
    });

    /** re-execute fetch and render. */
    ((this.$refs.Infinite as any).$refs.Infinite as any).$emit('$InfiniteLoading:reset');
  }
  getQueryByInput() {
    const rtn = {
      tag_id: this.selectedTags.map((tag) => tag.tag_id),
      tag_nm: this.selectedTags.map((tag) => tag.tag_nm),
      topics_keyword: this.searchQuery.trim(),
    };

    // remove undefined or null props
    return rtn.removeEmpty({ removeEmptyString: true, removeNull: true });
  }

  // LIFECYCLE HOOKS
  async mounted() {
    await this.load();
  }
}
</script>
