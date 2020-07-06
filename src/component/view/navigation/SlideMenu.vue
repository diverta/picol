<template>
  <div class="l-menu">
    <transition name="menu" appear>
      <div v-if="shows" class="l-menu__content">
        <div class="l-menu__header">
          <p class="l-menu__title">MENU</p>
          <button class="l-menu__close" @click.prevent="() => $emit('update:shows', false)">Close</button>
        </div>
        <div class="l-menu__body">
          <nav class="l-menu__items-wrapper">
            <ul class="l-menu__items">
              <li class="l-menu__item" v-for="(tagDef, idx) in tagDefsForMenu" :key="idx">
                <a href>
                  <a class="c-button" @click.prevent="(e) => execMenuFn(e, tagDef)">{{ tagDef.tag_nm }}</a>
                </a>
              </li>
              <li class="l-menu__item">
                <a href>
                  <a class="c-button" @click.prevent="logout">{{ $t('logout') }}</a>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>

    <transition name="menu-background" appear>
      <div v-if="shows" class="l-menu__background" @click.prevent="() => $emit('update:shows', false)"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Auth } from '@/kuroco_api/core/Auth';
import { TagCategoryStateModule } from '@/store';
import { TagModel } from '../../../type';

@Component<SlideMenu>({})
export default class SlideMenu extends Vue {
  // PROPS
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  shows!: boolean;

  // MUTATIONS
  get tagDefsForMenu() {
    const tagCategoryForMenu = TagCategoryStateModule.tagDefs.filter((tagDef) => tagDef.category_id === 4);
    if (tagCategoryForMenu.length === 0) {
      return [];
    }
    return tagCategoryForMenu[0].list;
  }

  // FIELDS
  TagCategoryStateModule = TagCategoryStateModule;

  // METHODS
  async logout(e: Event): Promise<void> {
    await Auth.logout({}).finally(() => {
      this.$router.push('/sub/login');
      this.$emit('update:shows', false);
    });
  }
  async execMenuFn(e: Event, tagDef: TagModel.Read.Response.List): Promise<void> {
    e.preventDefault();
    e.stopPropagation();
    this.$router.push({ name: 'search', query: { tag_id: `${tagDef.tag_id}` } });
    this.$emit('update:shows', false);
  }

  // LIFYCYCLE HOOKS
  mounted() {
    setTimeout((self: any) => (self.showState = 'block'), 250, this);
    TagCategoryStateModule.readAll();
  }
}

interface ISlideMenu {
  title: string;
  name: string;
}
</script>
<i18n locale="ja" lang="json5">
{
  "logout": "ログアウト"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "logout": "Logout"
}
</i18n>
