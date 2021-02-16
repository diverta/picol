<template functional>
  <div class="wrapper">
    <p class="text" v-html="props.errMsg"></p>
    <div class="button-wrapper">
      <button class="button" @click.prevent="listeners.click">RETRY</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 32px auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(1, 1, 1, 0.2);
  width: 70%;
  word-wrap: break-word;
  white-space: pre-line;
}

.text {
  margin: 24px auto;
  text-align: center;
  color: rgb(102, 102, 102);
}

.button-wrapper {
  text-align: center;
}

.button {
  margin-bottom: 16px;
  padding: 5px 10px;
  color: #999;
  font-size: 14px;
  line-height: 1;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
</style>
