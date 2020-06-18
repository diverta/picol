<template>
  <div>
    <header id="top" class="l-header">
      <div class="l-header__body">
        <p class="l-header__logo-wrapper">
          <a href="/">
            <img src="/assets/images/logo_diverta.svg" class="l-header__logo" alt="Diverta" />
          </a>
        </p>
        <div class="l-header__navigation">
          <button class="l-header__navigation-button--menu" @click="() => (showsSlideMenu = true)">Menu</button>
          <NavigationItems />
        </div>
      </div>
    </header>

    <SlideMenu v-if="showsSlideMenu" :shows.sync="showsSlideMenu" />
  </div>
</template>

<script lang="ts">
import NavigationItems from '@/component/view/navigation/NavigationItems.vue';
import { CreateElement, VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import SlideMenu from '@/component/view/navigation/SlideMenu.vue';

@Component<Navigation>({
  name: 'Navigation',
  components: {
    NavigationItems,
    SlideMenu,
  },
})
export default class Navigation extends Vue {
  showsSlideMenu = false;
}
</script>
