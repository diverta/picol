<template>
  <div id="app" class="l-wrapper">
    <main class="l-main">
      <div class="p-login">
        <div class="p-login__body">
          <h1 class="p-login__logo-wrapper">
            <img src="/assets/images/logo_diverta.svg" class="p-login__logo" />
          </h1>

          <p class="p-login__headline">コミュニケーション活性化のための<br />クローズドSNS「Picol」を体験する</p>

          <p class="p-login__lead">
            デモ版のPicolをお試しいただけます。下記のトライアル用アカウントでご利用ください。<br />
            <br />
            ログインID: guest<br />
            パスワード：guest528+<br />
            <br />
            【ご注意】<br />
            サービスは随時アップデートされております。実際のPicolの機能が利用可能になっており、投稿できますが、公開・削除されることに同意の上で記事を投稿ください。投稿内容が公序良俗に反する等の場合は、当社の判断で個別に削除する場合がございます。<br />
            ご利用について不明な点がございましたら<a href="https://www.diverta.co.jp/contact/">こちら</a
            >から運営会社へお問い合わせください。
          </p>

          <div class="p-login__form">
            <form>
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
              <button type="submit" class="p-login__submit" @click="submit">ログイン</button>
            </form>
          </div>

          <p>
            下記のGSuiteログインはDiverta社員のみが可能です。
            <br />社外の方は上記のGuestアカウントをご利用ください。
          </p>

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
import { OpenAPI } from '../../kuroco_api';

@Component<Login>({})
export default class Login extends Vue {
  // FIELDS
  input = {
    email: '',
    password: '',
  };

  // METHODS
  samlLogin(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    function createNodeWithAttributes(tagName: string, attributes: { nm: string; val: string }[] = []) {
      const node = document.createElement(tagName);
      attributes.forEach(({ nm, val }) => node.setAttribute(nm, val));
      return node;
    }

    const form = createNodeWithAttributes('form', [
      { nm: 'id', val: 'google_login_saml' },
      { nm: 'action', val: OpenAPI.SAML_URL },
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

    await Auth.login({ requestBody: { ...this.input } })
      .then((member_id) => UserStateModule.initialize({ member_id: member_id as number }))
      .catch((e) => {
        (this as any).$snack.danger({ text: 'ログインできませんでした。', button: 'OK' });
        console.error(e);
        return Promise.reject(e);
      });
    this.$router.push({ path: '/' });
  }
}
</script>
