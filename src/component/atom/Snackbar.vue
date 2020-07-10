<template>
  <div>
    <slot name="activator" :processing="processing" :on="on"></slot>
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
 *     <SnackbarCommit
 *       :fn="promiseFn"
 *       :msg="{
 *         ok: $t('deleted'),
 *         ng: $t('error_occurred'),
 *       }"
 *     >
 *       <template #activator="{ on }">
 *         <button @click="on">click</button>
 *       </template>
 *     </SnackbarCommit>
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
@Component<SnackbarCommit>({ name: 'SnackbarCommit' })
export default class SnackbarCommit extends Vue {
  @Prop({ type: Function, required: true })
  fn!: () => Promise<any>;

  @Prop({ type: Object, required: false, default: () => ({}) })
  msg?: MsgObject;

  /** An option whether renders error message server responsed. */
  @Prop({ type: Boolean, required: false, default: false })
  useServerErrMsg!: boolean;

  /** An option to use confirmation. */
  @Prop({ type: String, required: false })
  confirmMsg?: string;

  processing: boolean = false;

  on() {
    if (this.confirmMsg !== undefined && !window.confirm(this.confirmMsg)) {
      return;
    }

    const ok = this?.msg?.ok ?? this.$t('success');

    const _ng = this?.msg?.ng ?? this.$t('fail');
    const ng = (e: any) => (this.useServerErrMsg ? e?.body?.errors?.[0] ?? _ng : _ng);

    this.processing = true;
    this.fn()
      .then(() => (this as any).$snack.success({ text: ok, button: 'OK' }))
      .catch((e) => {
        (this as any).$snack.danger({
          text: ng(e),
          button: 'OK',
        });
      })
      .finally(() => (this.processing = false));
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
