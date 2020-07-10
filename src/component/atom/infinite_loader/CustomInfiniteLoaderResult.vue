<template functional>
  <div>
    <div :class="Object.entries(props).map(([k, v]) => (v !== undefined ? k : null))">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.margin {
  margin: 40px 0 80px 0;
}
</style>
