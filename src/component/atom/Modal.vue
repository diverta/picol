<script lang="ts">
import { OverlayStateModule } from '@/store';
import { CreateElement, VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

@Component<Modal>({ name: 'Modal' })
export default class Modal extends Vue {
  // MUTATIONS
  get overlayComponentDef() {
    return OverlayStateModule.overlayComponentDef;
  }
  get shows() {
    return !!this.overlayComponentDef.component;
  }

  // METHODS
  render(h: CreateElement): VNode {
    if (!this.shows) {
      return h('');
    }
    const props = { ...this.overlayComponentDef.props };
    return h(this.overlayComponentDef.component, { props: { props } });
  }
}
</script>
