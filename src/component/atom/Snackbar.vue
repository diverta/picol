<template>
  <div>
    <slot name="activator" :on="on"></slot>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * A component that wraps snackbar renderer.
 *
 * @example ```
 * <template>
 *   <div>
 *     <Snackbar
 *       :fn="promiseFn"
 *       :msg="{
 *         ok: $t('deleted'),
 *         ng: $t('error_occurred'),
 *       }"
 *     >
 *       <template #activator="{ on }">
 *         <button @click="on">click</button>
 *       </template>
 *     </Snackbar>
 *   </div>
 * </template>
 *
 * ...
 *  async promiseFn() {
 *    await new Promise((resolve) => setTimeout(resolve, 1000));
 *  }
 * ...
 * ```
 */
@Component<Snackbar>({ name: 'Snackbar' })
export default class Snackbar extends Vue {
  @Prop({ type: Function, required: true })
  fn!: () => Promise<any>;

  @Prop({ type: Object, required: false, default: () => ({}) })
  msg?: MsgObject;

  on() {
    const ok = this?.msg?.ok ?? this.$t('success');
    const ng = this?.msg?.ng ?? this.$t('fail');

    this.fn()
      .then(() => (this as any).$snack.success({ text: ok, button: 'OK' }))
      .catch(() => (this as any).$snack.danger({ text: ng, button: 'OK' }));
  }
}

interface MsgObject {
  ok?: string;
  ng?: string;
}
</script>

<i18n locale="ja" lang="json5">
{
  "success": "成功しました。",
  "fail": "エラーが発生しました。",
}
</i18n>
<i18n locale="en" lang="json5">
{
  "deleted": "OK.",
  "error_occurred": "An error has occurred.",
}
</i18n>
