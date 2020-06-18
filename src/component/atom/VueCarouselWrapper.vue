<template>
  <carousel
    :per-page="1"
    :loop="true"
    :pagination-padding="6"
    :pagination-size="6"
    :pagination-active-color="'#F66B9C'"
    :pagination-color="'#D7DADD'"
    :resistance-coef="10"
    :navigationEnabled="true"
  >
    <slot></slot>
  </carousel>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component<VueCarouselWrapper>({
  name: 'carousel-wrapper',
  components: {},
})
export default class VueCarouselWrapper extends Vue {}
</script>

<style lang="css">
.VueCarousel-wrapper {
  cursor: pointer !important;
}
.VueCarousel-navigation-button {
  display: block !important;
  width: 24px !important;
  height: 24px !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  color: rgba(0, 0, 0, 0) !important;
  transition: opacity 0.2s ease-in-out !important;
  opacity: 0.5 !important;
}
.VueCarousel-navigation-button:hover {
  opacity: 1 !important;
}
.VueCarousel-navigation-prev {
  transform: translateY(-50%) translateX(50%) !important;
  background-image: url(/assets/images/prev.png) !important;
}
.VueCarousel-navigation-next {
  transform: translateY(-50%) translateX(-50%) !important;
  background-image: url(/assets/images/next.png) !important;
}
</style>
