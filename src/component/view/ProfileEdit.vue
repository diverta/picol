<template>
  <transition name="modal">
    <div v-if="shows" class="l-overlay">
      <!-- body -->
      <div class="l-overlay__body">
        <div class="p-profile-edit">
          <dl class="p-profile-edit__body">
            <dt class="p-profile-edit__item-headline">{{ $t('profile_image') }}</dt>
            <dd class="p-profile-edit__item-body">
              <div class="p-profile-edit__file">
                <img :src="avatarImage" alt class="p-profile-edit__icon" />
                <div class="p-profile-edit__input-file-wrapper" :style="imgButtonStyle.opacity">
                  <input
                    type="file"
                    class="p-profile-edit__input-file"
                    :style="imgButtonStyle.curser"
                    @change.prevent="
                      ($event) => (postingState !== 'COMPLETE' ? handleChangeFileInput($event) : undefined)
                    "
                  />
                  <div class="c-button">{{ $t('change_image') }}</div>
                </div>
                <div class="p-profile-edit__item-condition">
                  <p class="p-profile-edit__item-condition-text">{{ $t('file_type') }}</p>
                  <p class="p-profile-edit__item-condition-text">{{ $t('file_size') }}</p>
                </div>
              </div>
            </dd>

            <dt class="p-profile-edit__item-headline">{{ $t('user_name') }}</dt>
            <dd class="p-profile-edit__item-body">
              <input
                type="text"
                class="p-profile-edit__input-text"
                v-model="userName"
                :readonly="postingState === 'COMPLETE'"
              />
            </dd>
          </dl>
        </div>
      </div>
      <!-- footer buttons -->
      <div class="l-overlay__footer">
        <div v-if="postingState === 'COMPLETE'" class="p-profile-edit__footer">
          <button class="c-button" @click.prevent="() => $emit('update:shows', false)">OK</button>
        </div>
        <div v-else class="p-profile-edit__footer">
          <button class="c-button" @click.prevent="() => $emit('update:shows', false)">{{ $t('cancel') }}</button>
          <button class="c-button--primary" @click.prevent="handleClickSubmit">{{ $t('save') }}</button>
        </div>
      </div>
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { UserStateModule } from '@/store';
import { CONSTANTS } from '@/core';
import { AccountModel, FileUploadModel } from '../../type';
import { MembersService } from '@/kuroco_api/services/MembersService';
import { Uploader, UploaderFactory } from '@/kuroco_api/core/Uploader';

@Component<ProfileEdit>({})
export default class ProfileEdit extends Vue {
  // PROPS
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  shows!: boolean;

  // FIELDS
  uploader!: Uploader;
  UserStateModule = UserStateModule;
  userName = '';
  postingState = 'PRE';
  file?: File;
  memberPhoto: Partial<MemberPhoto> = {};

  // MUTATIONS
  get isLoading() {
    return this.postingState === 'LOADING';
  }
  get imgButtonStyle() {
    return this.postingState === 'COMPLETE'
      ? {
          opacity: 0.3,
          cursor: 'pointer',
        }
      : { opacity: 0, cursor: 'unset' };
  }
  get avatarImage(): string {
    return !!this.memberPhoto.file_id ? window.URL.createObjectURL(this.file) : this.myAvatarSrc;
  }
  get myAvatarSrc(): string {
    return this.UserStateModule.myImage;
  }

  // METHODS
  async handleChangeFileInput(e: Event) {
    const newFile = (e.target as any).files[0];
    if (newFile === undefined) {
      return;
    }

    // checking whether this file have a proper extension.
    const properExts = [CONSTANTS.UPLOADABLE_FILETYPE_DEF.PNG, CONSTANTS.UPLOADABLE_FILETYPE_DEF.JPEG]
      .map((def) => def.exts)
      .flat(1);
    if (!properExts.includes(newFile.name.split(/\./g).pop())) {
      window.alert(`${newFile.name} ` + this.$t('invaild_image'));
      return;
    }

    this.postingState = 'LOADING';

    const { file_id } = await this.uploader.upload(newFile).catch((e) => {
      this.postingState = 'ERROR';
      this.$snack.danger({ text: this.$t('error_occurred') });
      return Promise.reject();
    });

    this.file = newFile;
    this.memberPhoto = {
      file_id,
      file_nm: newFile.name,
    };
    this.postingState = 'PRE';
    this.$snack.success({ text: this.$t('updated') });
  }
  handleClickSubmit(e: Event) {
    if (!this.userName || this.userName === '') {
      window.alert(this.$t('dont_empty_user_name'));
      return;
    }

    const query: MembersService.postMembersServiceRcmsApi1MemberUpdateRequest = {
      requestBody: {
        nickname: this.userName,
        member_photo: this.memberPhoto,
      },
    };

    this.postingState = 'LOADING';
    UserStateModule.updateUser(query)
      .then(() => {
        this.postingState = 'COMPLETE';
        this.$snack.show({ text: this.$t('updated') });
      })
      .catch((e) => {
        this.postingState = 'ERROR';
        this.$snack.danger({ text: this.$t('error_occurred') });
      });
  }
  async uploadImageToStorage(file: File) {
    return await this.uploader.upload(file);
  }

  // LIFECYCLE HOOKS
  async mounted() {
    this.uploader = await UploaderFactory.create({});
    this.userName = this.UserStateModule.selfUser.nickname;
  }
}

interface MemberPhoto {
  file_id: string;
  file_nm: string;
}
</script>
<i18n locale="ja" lang="json5">
{
  "profile_image": "プロフィール画像",
  "change_image": "画像を変更する",
  "error_occurred": "エラーが発生しました。",
  "cancel": "キャンセル",
  "save": "保存",
  "user_name": "ユーザー名",
  "file_type": "ファイル形式：JPG, PNG",
  "file_size": "ファイルサイズ：600px 以内 30kb以下",
  "dont_empty_user_name": "ユーザー名は空にできません。",
  "invaild_image": "の拡張子は対応していません。",
  "updated": "ユーザー情報を更新しました。"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "profile_image": "Profile Image",
  "change_image": "Change images",
  "error_occurred": "An error has occurred.",
  "cancel": "Cancel",
  "save": "Update",
  "user_name": "User name",
  "file_type": "File type：JPG, PNG",
  "file_size": "File size：600px or less 30kb or less",
  "dont_empty_user_name": "Don't empty user name",
  "invaild_image": "extension is not supported.",
  "updated": "Updated."
}
</i18n>
