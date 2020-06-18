import { util } from '@/util/util';

export const CustomVuePlugin = {
  install(Vue: any, options: any) {
    Vue.prototype.exists = util.exists;
    Vue.prototype.getHowLongBeforePostedData = util.getHowLongBeforePostedData;
  },
};
