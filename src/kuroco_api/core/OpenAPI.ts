/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

interface Config {
    SAML_URL: string;
    BASE: string;
    VERSION: string;
    TOKEN: string;
    SECURITY: { [definedName: string]: object };
}

export const OpenAPI: Config = {
  SAML_URL: 'https://picol.kuroco.app/direct/login/saml_login/?spid=1',
  BASE: 'https://picol.kuroco.app',
  VERSION: '1.0',
  TOKEN: '',
  SECURITY: {
    'Token-Auth': {
      type: 'apiKey',
      in: 'header',
      name: 'X-RCMS-API-ACCESS-TOKEN',
    },
  },
};
