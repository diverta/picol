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

const BASE = process.env.KUROCO_HOST || 'https://picol.g.kuroco.app';
const SAML_URL = `${BASE}/direct/login/saml_login/?spid=1`;
export const OpenAPI: Config = {
  SAML_URL,
  BASE,
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
