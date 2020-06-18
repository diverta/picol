<template>
  <div class="l-wrapper" id="app">
    <Navigation v-if="this.$route.name !== 'login'" />
    <main class="l-main">
      <router-view :key="$route.fullPath"></router-view>
      <Modal />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Auth } from '@/kuroco_api/core/Auth';

@Component({})
export default class App extends Vue {
  async created() {
    Auth.onErrorHandler = async (res) => {
      this.$router.push({ path: '/sub/login' });
      (this as any).$snack.danger({ text: 'ログインしてください。', button: 'OK' });
    };
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/global.sass';
@import '@/assets/styles/common.sass';
</style>
