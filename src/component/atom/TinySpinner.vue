<template>
  <div class="lds-ring" :style="styles.wrapper">
    <div :style="styles.ring"></div>
    <div :style="styles.ring"></div>
    <div :style="styles.ring"></div>
    <div :style="styles.ring"></div>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<TinySpinner>({})
export default class TinySpinner extends Vue {
  @Prop({ type: String, required: false, default: 's' })
  size!: string;

  get styles() {
    let basePX: number;
    switch (this.size.toLowerCase()) {
      case 's':
        basePX = 16;
        break;
      case 'm':
        basePX = 32;
        break;
      case 'l':
        basePX = 64;
        break;
      default:
        throw Error(`Invalid Specification: size: ${this.size}`);
    }

    const wrapperSize = `${basePX}px`;
    const ringSize = `${basePX / 1.25}px`;
    const ringMargin = `${basePX / 10.6}px`;
    return {
      wrapper: { width: wrapperSize, height: wrapperSize },
      ring: { width: ringSize, height: ringSize, margin: ringMargin, 'border-width': ringMargin },
    };
  }
}
</script>

<style scoped>
.lds-ring {
  display: block;
  position: relative;
  margin: auto;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #b1d0ff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #b1d0ff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
