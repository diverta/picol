<template>
  <transition name="modal">
    <div v-if="shows" class="l-overlay">
      <div class="l-overlay__body">
        <!-- during processing -->
        <div class="c-overlay" v-if="isLoading">
          <img src="/assets/images/icon_post_on.svg" alt class="c-overlay__icon" width="56" height="52" />
          <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
          <p class="c-overlay__text">{{ $t('sending') }}</p>
        </div>
        <!-- done -->
        <div class="c-overlay" v-else>
          <img src="/assets/images/icon_forget.svg" alt class="c-overlay__icon" width="121" height="52" />
          <p class="c-overlay__text">{{ hasError ? $t('fail_to_send') : $t('sent') }}</p>
        </div>
      </div>
      <div class="l-overlay__footer">
        <a href="#" class="c-button" @click.prevent="routeTo">OK</a>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import { FeedStateModule } from '../../store';

@Component<Post>({})
export default class Post extends Vue {
  // PROPS
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  shows!: boolean;
  @Prop({
    type: Function,
    required: true,
    default: () => Promise.reject(),
  })
  requestFn!: () => Promise<any>;

  // FIELDS
  isLoading = true;
  hasError = false;

  // METHODS
  @Watch('shows', { immediate: true })
  onChangeShows(cur: boolean, old: boolean) {
    if (cur === true) {
      this.exec();
    }
  }
  exec() {
    this.requestFn()
      .then(() => FeedStateModule.clear())
      .catch((err) => {
        console.error(err);
        this.hasError = true;
      })
      .finally(() => (this.isLoading = false));
  }
  routeTo() {
    this.$emit('update:shows', false);
    if (!this.hasError) {
      this.$router.push('/');
    }
  }
}

export interface Prop {
  requestFn: (arg?: any) => Promise<any>;
  whatYouSent: string;
  routeOnSuccess: string;
  routeOnError: string;
}
</script>
<i18n locale="ja" lang="json5">
{
  "sent": "送信しました。",
  "fail_to_send": "送信に失敗しました。",
  "sending": "送信中です..."
}
</i18n>
<i18n locale="en" lang="json5">
{
  "sent": "Sent",
  "fail_to_send": "Failed to send.",
  "sending": "Sending..."
}
</i18n>
