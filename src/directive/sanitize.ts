import Vue from 'vue';
import sanitizeHtml from 'sanitize-html';
import { DirectiveBinding } from 'vue/types/options';

export const SanitizeDirective = {
  bind(el: HTMLElement, binding: DirectiveBinding) {
    if (!!el) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const body = sanitizeHtml(
        el.innerHTML
          .replace(urlRegex, (url) => '<a href="' + url + '" target="_blank">' + url + '</a>')
          .replace(/(?:\r\n|\r|\n)/g, '<br />'),
        { allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'] },
      );
      el.innerHTML = body;
    }
  },
};

Vue.directive('sanitize', SanitizeDirective);
