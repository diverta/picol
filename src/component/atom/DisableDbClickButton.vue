<template>
  <button :disabled="disabled || processing" @click.prevent="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<DisableDbClickButton>({ name: 'disable-dbclick-button' })
export default class DisableDbClickButton extends Vue {
  @Prop({ type: Function, required: true })
  onclick!: (args: any) => Promise<any>;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  processing = false;

  handleClick(event: Event) {
    if (this.processing) {
      return;
    }
    this.processing = true;
    this.onclick(event).then(() => {
      this.processing = false;
    });
  }
}
</script>
