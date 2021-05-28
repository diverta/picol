/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { LocalStorage } from '@/kuroco_api/core/LocalStorage';

interface Config {
  getSamlUrl: () => string;
  getBase: () => string;
  VERSION: string;
  TOKEN: string;
  SECURITY: { [definedName: string]: object };
}

const getBase = () => `https://${LocalStorage.getCompanyCd()}.g.kuroco.app`;
const getSamlUrl = () => `${getBase()}/direct/login/saml_login/?spid=1`;
export const OpenAPI: Config = {
  getSamlUrl,
  getBase,
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
