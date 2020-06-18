<template>
  <div class="p-post__caption">
    <img :src="UserStateModule.myImage" alt="My Page" class="p-post__caption-icon" />
    <div
      class="p-post__caption-input"
      contenteditable="true"
      data-placeholder="キャプションを書く…"
      @input.prevent="sync"
      ref="editable"
    ></div>
  </div>
</template>

<script lang="ts">
import { FeedStateModule, UserStateModule } from '@/store';
import { TagModel } from '@/type/api';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TopicsService } from '@/kuroco_api';
import truncate from 'lodash/truncate';
import { PostFileHelper } from '@/util';

@Component<CreateFeedContainerCaption>({
  components: {},
})
export default class CreateFeedContainerCaption extends Vue {
  // PROPS
  @Prop({
    type: String,
    required: false,
    default: '',
  })
  commentInput!: string;

  // FIELDS
  UserStateModule = UserStateModule;
  requestFn: () => Promise<any> = () => Promise.resolve();
  showsPost = false;

  // METHODS
  sync(e: any) {
    const inputStr = e.target.innerText.trim();
    if (inputStr.length > 2000) {
      e.target.innerText = this.commentInput;
      e.preventDefault();
      (this as any).$snack.danger({ text: '本文は2000文字以内で入力してください。', button: 'OK' });
      return;
    }
    this.$emit('update:commentInput', inputStr);
  }

  // LIFECYCLE HOOKS
  mounted() {
    (this.$refs.editable as any).innerText = this.commentInput;
  }
}
</script>
