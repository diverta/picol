<template>
  <nav class="l-navigation">
    <ul class="l-navigation__items">
      <li class="l-navigation__item" v-for="({ name, title }, idx) in navigationItems" :key="idx">
        <router-link-ext v-if="$route.name !== name" :to="{ name }" exact>
          <a :href="name" :class="[`l-navigation__button--${title.toLowerCase()}`]">{{ title }}</a>
        </router-link-ext>
        <a v-else href="javascript:void(0)" :class="[`l-navigation__button--${title.toLowerCase()}`, 'is-current']">{{
          title
        }}</a>
      </li>

      <li class="l-navigation__item">
        <router-link-ext :to="{ name: 'mypage' }" exact>
          <a class="l-navigation__button">
            <img :src="myAvatarSrc" alt="My Page" class="l-navigation__icon" />
          </a>
        </router-link-ext>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { UserStateModule } from '@/store';
import { CreateElement, VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

@Component<NavigationItems>({})
export default class NavigationItems extends Vue {
  // FIELDS
  navigationItems = [
    { name: 'feeds', title: 'HOME' },
    { name: 'search', title: 'SEARCH' },
    { name: 'post', title: 'POST' },
    {
      name: 'activity',
      title: 'ACTIVITY',
    },
  ];
  UserStateModule = UserStateModule;

  // MUTATIONS
  get getClassObj() {
    return (navigationItem: NavigationItem) => {
      const classObj: any = {};
      classObj[navigationItem.class] = true;
      classObj['is-current'] = this.$route.name === navigationItem.name;
      return classObj;
    };
  }
  get myAvatarSrc(): string {
    return this.UserStateModule.myImage;
  }
}

interface NavigationItem {
  name: string;
  class: string;
  title: string;
}
</script>
