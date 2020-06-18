import Vue from 'vue';
import sanitizeHtml from 'sanitize-html';
import { DirectiveBinding } from 'vue/types/options';

export const SanitizeDirective = {
  bind(el: HTMLElement, binding: DirectiveBinding) {
    if (!!el) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const body = sanitizeHtml(
        el.innerHTML
          .replace(/(?:\r\n|\r|\n)/g, '<br />')
          .replace(urlRegex, (url) => '<a href="' + url + '">' + url + '</a>'),
        { allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'] },
      );
      el.innerHTML = body;
    }
  },
};

Vue.directive('sanitize', SanitizeDirective);
