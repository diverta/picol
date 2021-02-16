<template functional>
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

<style lang="css">
.vue-carousel-wrapper {
  cursor: pointer !important;
}
.vue-carousel-navigation-button {
  display: block !important;
  width: 24px !important;
  height: 24px !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  color: rgba(0, 0, 0, 0) !important;
  transition: opacity 0.2s ease-in-out !important;
  opacity: 0.5 !important;
}
.vue-carousel-navigation-button:hover {
  opacity: 1 !important;
}
.vue-carousel-navigation-prev {
  transform: translateY(-50%) translateX(50%) !important;
  background-image: url(/assets/images/prev.png) !important;
}
.vue-carousel-navigation-next {
  transform: translateY(-50%) translateX(-50%) !important;
  background-image: url(/assets/images/next.png) !important;
}
.VueCarousel-navigation-next,
.VueCarousel-navigation-prev {
  transform: translateY(-50%) translateX(0) !important;
}
</style>
