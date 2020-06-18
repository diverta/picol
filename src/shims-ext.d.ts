import { util } from '@/util/util';

declare global {
  interface Array<T> {
    unique(option?: { identifierPropKey?: string }): Array<T>;
    pushAll(elements: T[]): void;
    clear(): void;
    replaceAll(elements: T[]): void;
  }

  interface Object {
    removeEmpty<T>(option?: { removeEmptyString?: boolean; removeNull?: boolean }): T;
    getValue(keyNames: string[]): any;
  }
}

/**
 * append custom plugin types.
 * @see plugin.ts
 */
declare module 'vue/types/vue' {
  interface Vue {
    exists: typeof util.exists;
    getHowLongBeforePostedData: typeof util.getHowLongBeforePostedData;
  }
}
