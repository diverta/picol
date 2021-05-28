<template>
  <div id="app" class="l-wrapper">
    <main class="l-main">
      <div class="p-login">
        <div class="p-login__body">
          <h1 class="p-login__logo-wrapper">
            <img src="/assets/images/logo_diverta.svg" class="p-login__logo" />
          </h1>

          <p class="p-login__headline" v-html="$t('headline')"></p>
          <p class="p-login__lead">
            <span v-html="$t('lead.header')"></span>
            <a href="https://github.com/diverta/picol">{{ $t('lead.github_link') }}</a>
            <span v-html="$t('lead.footer')"></span>
            <a href="https://www.diverta.co.jp/contact/">{{ $t('lead.inquiry_link') }}</a>
          </p>

          <div class="p-login__form">
            <form>
              <input
                v-if="showsCompanyCdInput"
                type="text"
                name="company_cd"
                v-model.trim="input.companyCd"
                placeholder="Company Code"
                single-line
                class="p-login__input"
              />
              <input
                type="text"
                name="email"
                v-model.trim="input.email"
                placeholder="Account"
                single-line
                class="p-login__input"
              />
              <input
                type="password"
                name="password"
                v-model.trim="input.password"
                placeholder="Password"
                single-line
                class="p-login__input"
              />
              <button type="submit" class="p-login__submit" @click="submit">{{ $t('login') }}</button>
            </form>
          </div>

          <p v-html="$t('notice')"></p>

          <!-- SAML -->
          <ul class="p-login__oauth-list">
            <li class="p-login__oauth-item">
              <button class="p-login__oauth-link" @click="samlLogin">
                <img src="/assets/images/logo_google.svg" alt="Google" class="p-login__oauth-image" />
              </button>
            </li>
          </ul>
        </div>

        <p class="p-login__corporate-logo-wrapper">
          <small class="p-login__corporate-logo">Diverta</small>
        </p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import { Component } from 'vue-property-decorator';
import { Auth } from '@/kuroco_api/core/Auth';
import { UserStateModule } from '../../store';
import { LocalStorage, OpenAPI } from '../../kuroco_api';

@Component<Login>({})
export default class Login extends Vue {
  // FIELDS
  input = {
    email: '',
    password: '',
    companyCd: '',
  };
  showsCompanyCdInput = false;

  // METHODS
  samlLogin(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    LocalStorage.setCompanyCd('picol');

    function createNodeWithAttributes(tagName: string, attributes: { nm: string; val: string }[] = []) {
      const node = document.createElement(tagName);
      attributes.forEach(({ nm, val }) => node.setAttribute(nm, val));
      return node;
    }

    const form = createNodeWithAttributes('form', [
      { nm: 'id', val: 'google_login_saml' },
      { nm: 'action', val: OpenAPI.getSamlUrl() },
      { nm: 'method', val: 'POST' },
    ]);
    const input = createNodeWithAttributes('input', [
      { nm: 'type', val: 'hidden' },
      { nm: 'name', val: 'api_id' },
      { nm: 'value', val: '1' },
    ]);

    form.appendChild(input);

    (document.querySelector('body') as HTMLBodyElement).appendChild(form);
    (document.querySelector('#google_login_saml') as HTMLFormElement).submit();
  }
  async submit(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    LocalStorage.setCompanyCd(this.input.companyCd);
    await Auth.login({ requestBody: { ...this.input } })
      .then((member_id) => UserStateModule.initialize({ member_id: member_id as number }))
      .catch((e) => {
        switch (e.status) {
          case 401:
            this.$snack.danger({ text: this.$t('loginFailed') });
            break;
          case 404:
          case 0:
            this.$snack.danger({ text: this.$t('invalidcompanyCd') });
            break;
          default:
            console.dir(e.status);
            this.$snack.danger({ text: this.$t('loginFailed') });
        }
        LocalStorage.restoreCompanyCd();
        this.showsCompanyCdInput = true;
        return Promise.reject(e);
      });
    this.$router.push({ path: '/' });
  }

  initialize() {
    const companyCdQuery = this.$route.query?.company_cd;
    if (typeof companyCdQuery === 'string' && companyCdQuery) {
      LocalStorage.setCompanyCd(companyCdQuery);
      this.input.companyCd = companyCdQuery as string;
      this.showsCompanyCdInput = false;
      return;
    }

    const companyCdOnStorage = LocalStorage.getCompanyCd();
    if (companyCdOnStorage) {
      this.input.companyCd = companyCdOnStorage;
      this.showsCompanyCdInput = true;
      return;
    }

    this.input.companyCd = 'picol';
    this.showsCompanyCdInput = true;
  }

  mounted() {
    this.initialize();
  }
}
</script>

<i18n locale="ja" lang="json5">
{
  "headline": "コミュニケーション活性化のための<br />クローズドSNS「Picol」を体験する",
  "lead": {
    "github_link": "Githubレポジトリ",
    "header": "<br />デモ版のPicolをお試しいただけます。下記のトライアル用アカウントでご利用ください。<br /> \
    <br /> \
    ログインID: guest<br /> \
    パスワード：guest528+<br /><br /> \
    このサービスはバックエンドはKurocoを利用していますが、フロントエンドはオープンソースになっています。ソースコードは以下にありますので、ご自由にお使いください。<br />",
    "inquiry_link": "お問い合わせフォーム",
    "footer": "<br /><br />【ご注意】<br /> \
    サービスは随時アップデートされております。実際のPicolの機能が利用可能になっており、投稿できますが、公開・削除されることに同意の上で記事を投稿ください。投稿内容が公序良俗に反する等の場合は、当社の判断で個別に削除する場合がございます。<br /> \
    ご利用について不明な点がございましたら以下から開発会社へお問い合わせください。<br />",
  },
  "notice": "下記のGSuiteログインはDiverta社員のみが可能です。\
  <br />社外の方は上記のGuestアカウントをご利用ください。",
  "loginFailed": "ログインできませんでした。",
  "invalidcompanyCd": "company code が違います。",
  "login": "ログイン"
}
</i18n>
<i18n locale="en" lang="json5">
{
  "headline": "Private SNS \"Picol\"",
  "lead": {
    "github_link": "Github Repository",
    "header": "<br />You can try the demo version of Picol. Please use the trial account below.<br /> \
    <br /> \
    Id: guest<br /> \
    Password：guest528+<br /><br /> \
    <br />This service uses Kuroco as the back-end, but the front-end is open source. The source code is below, so feel free to use it.<br />",
    "inquiry_link": "Contact Form",
    "footer": "<br /><br />[Notice]<br /> \
    The service is updated from time to time. Although the actual Picol function is available and you can post, please post the article with the agreement that it will be published and deleted. If the posted content is against public order and morals, we may delete it at our discretion.<br /> \
    If you have any questions about this service,please contact us.<br />",
  },
  "notice": "The following G Suite SSO login are only available to Diverta employees.",
  "loginFailed": "Login Failed.",
  "invalidcompanyCd": "The company code is not found.",
  "login": "Login"
}
</i18n>
