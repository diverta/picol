<template>
  <div>
    <div v-if="!hasVimeoError" alt="video" :class="videoClass">
      <div ref="vimeoIframe" :id="id"></div>
    </div>
    <div v-else alt="video" ref="error" :class="`${videoClass} vimeo-loading-error-wrapper`">
      <p class="vimeo-loading-error">動画を変換中です。<br />しばらく経ってから再度表示してください。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Player from '@vimeo/player';

@Component<VimeoContainer>({})
export default class VimeoContainer extends Vue {
  // PROPS
  @Prop({ type: String, required: false, default: '' })
  videoClass!: string;
  @Prop({ type: String, required: true })
  id!: string;
  @Prop({ type: String, required: true })
  url!: string;

  // FIELDS
  hasVimeoError = false;

  // METHODS
  async bootVimeo(id: string, url: string) {
    await new Player(id, {
      url,
      responsive: true,
    }).ready();
  }
  getElmInfo() {
    const getElm = (ref: any) => (Array.isArray(ref) ? ref[0] : ref) as Element;
    return this.hasVimeoError ? getElm(this.$refs.error) : getElm(this.$refs.vimeoIframe);
  }

  // LIFECYCLE HOOKS
  mounted() {
    this.bootVimeo(this.id, this.url)
      .catch((e) => {
        console.error(e);
        this.hasVimeoError = true;
      })
      .finally(() => this.$emit('load', this.getElmInfo()));
  }
}
</script>

<style lang="css">
.vimeo-loading-error-wrapper {
  background-color: black;
  height: 260px;
  display: flex;
  justify-content: space-around;
  border: 16px solid white;
}
.vimeo-loading-error {
  text-align: center;
  margin: 96px 0;
  color: white;
}
</style>
