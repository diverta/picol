import store from '@/store/store';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

export interface IOverlayState {
  overlayComponentDef: OverlayComponentDef;
}
export interface OverlayComponentDef {
  component: Vue.Component | undefined;
  props?: any;
}

@Module({ dynamic: true, store, name: 'overlay', namespaced: true })
class Overlay extends VuexModule implements IOverlayState {
  overlayComponentDef: OverlayComponentDef = {
    component: undefined,
    props: undefined,
  };

  @Action({ rawError: true })
  open(def: OverlayComponentDef) {
    this.UPDATE_OVERLAY_COMPONENT_DEF(def);
  }

  @Action({ rawError: true })
  close() {
    this.UPDATE_OVERLAY_COMPONENT_DEF();
  }

  @Mutation
  private UPDATE_OVERLAY_COMPONENT_DEF(def?: OverlayComponentDef) {
    this.overlayComponentDef.component = !!def ? def.component : undefined;
    this.overlayComponentDef.props = !!def ? def.props : undefined;
  }
}

export const OverlayStateModule = getModule(Overlay);
