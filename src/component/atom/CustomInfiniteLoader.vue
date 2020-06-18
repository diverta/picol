<template>
  <infinite-loading @infinite="handleOnInfinit" ref="Infinite">
    <div slot="spinner">
      <loading :active="true" :can-cancel="false" :is-full-page="true"></loading>
    </div>
    <div :style="messageMarginStyle" slot="no-more">
      <span class="text-shadow" v-if="showsNoMoreMessage && count > 1">これ以上のデータはありません。</span>
    </div>
    <div :style="messageMarginStyle" slot="no-results">
      <span class="text-shadow">結果が見つかりませんでした。</span>
    </div>
    <div :style="messageMarginStyle" slot="error">
      <AppError :errMsg="errMsg" :trigger="restartLoader" />
    </div>
  </infinite-loading>
</template>

<script lang="ts">
import AppError from '@/component/atom/AppError.vue';
import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<CustomInfiniteLoader>({
  components: {
    InfiniteLoading,
    AppError,
  },
})
export default class CustomInfiniteLoader extends Vue {
  // PROPS
  @Prop({ type: Function, required: true })
  infiniteHandler!: ($state: StateChanger) => void;
  @Prop({ type: Object, required: false, default: () => ({}) })
  messageMarginStyle!: object;
  @Prop({ type: Boolean, required: false, default: false })
  showsNoMoreMessage!: boolean;

  // FIELDS
  count = 0;
  errMsg = `
        最新のデータが取得できませんでした。
        電波状況などが悪い可能性があります。
        電波状況をご確認の上、再度お試しください。
      `;

  // METHODS
  restartLoader() {
    const stateChanger = (this.$refs.Infinite as any).stateChanger as StateChanger;
    stateChanger.reset();
  }
  handleOnInfinit($state: StateChanger) {
    this.count += 1;
    return this.infiniteHandler($state);
  }
  reset() {
    (this.$refs.Infinite as any).stateChanger.reset();
  }
}
</script>

<style>
.infinite-loading-container {
  margin-bottom: 96px;
}
.infinite-loading-container .text-shadow {
  text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, 0 1px 0 #fff, -1px 0 #fff,
    -1px 0 0 #fff, 1px 0 0 #fff;
}
</style>
