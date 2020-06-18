import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface ElementAttributesProperty {
      _attrs: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

/**
 * append below conf to avoid TS warnings.
 * @see https://github.com/kaorun343/vue-property-decorator/issues/187
 */
declare module 'vue/types/vue' {
  interface Vue {
    _attrs: any;
  }
}
