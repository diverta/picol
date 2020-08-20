<template>
  <div @click.prevent="routeTo">
    <router-link :to="{}" exact>
      <slot></slot>
    </router-link>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';

/**
 * component for forcing files to stop loading.
 * there is no way to enable deletion of loading before router-link routes,
 * this component is wrapper of <route-link> routing-related component and forces to be enable it.
 * @note hacky.
 * @example ```
 * // TestComponent.vue
 * <template>
 *   <router-link-ext :to="...">
 *     <!-- file loading for below image will be aborted when router-link event is fired. -->
 *     <img src="SuperHeavyImage.png" data-bigfile />
 *   </router-link>
 * </tamplate>
 * ```
 * @see https://stackoverflow.com/questions/5278304/how-to-cancel-an-image-from-loading
 * @see https://github.com/vuejs/vue-router/issues/800
 */
@Component<RouterLinkExt>({})
export default class RouterLinkExt extends Vue {
  @Prop({ type: Object, required: true })
  to!: Location;
  /** function that hooks between from to dist */
  @Prop({ type: Function, required: false, default: () => Promise.resolve() })
  hook!: <T>() => Promise<T>;

  async routeTo(e: Event) {
    abortLoadingBigDatas();
    await this.hook();
    this.$router.push(this.to);
  }
}

/**
 * remove specific elements which are marked `data-bigfile` attributes.
 */
export function abortLoadingBigDatas() {
  Array.from(document.querySelectorAll('[data-bigfile]')).forEach((e: any) => {
    e.src = '';
    (e.parentElement as HTMLElement).remove();
  });
}
</script>
