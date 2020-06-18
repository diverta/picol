import Vue from 'vue';
import { DirectiveBinding } from 'vue/types/options';

export const TrimDirective = {
  bind(el: HTMLElement, binding: DirectiveBinding) {
    if (!!el) {
      let txt = (el || {}).innerHTML || '';
      const txts = txt.split(/(?:\r\n|\r|\n)/g);

      // cut off texts over 3 lines.
      if (txts.length > 3) {
        txt = Array(3)
          .join(',')
          .split(',')
          .map((_, i) => txts[i])
          .join('\n');
        txt = `${txt}\n…`;
      }

      // set limitation.
      if (txt.length > 500) {
        txt = txt.substr(0, 500) + '…';
      }

      el.innerHTML = txt;
    }
  },
};

Vue.directive('trim', TrimDirective);
