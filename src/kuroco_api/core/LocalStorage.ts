/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

let companyCodeCache = '';

export class LocalStorage {
  /** get */
  public static getAccessToken() {
    const token = localStorage.getItem(LocalStorage.TokenKeys.accessToken);
    return !!token ? token : '';
  }
  public static getRefreshToken() {
    const token = localStorage.getItem(LocalStorage.TokenKeys.refreshToken);
    return !!token ? token : '';
  }
  public static getCompanyCode() {
    return localStorage.getItem('company_code');
  }

  /** set */
  public static setAccessToken(token: string) {
    localStorage.setItem(LocalStorage.TokenKeys.accessToken, token);
  }
  public static setRefreshToken(token: string) {
    localStorage.setItem(LocalStorage.TokenKeys.refreshToken, token);
  }
  public static setCompanyCode(companyCode: string) {
    companyCodeCache = LocalStorage.getCompanyCode() || '';
    localStorage.setItem('company_code', companyCode);
  }

  /** delete */
  public static deleteAccessToken() {
    localStorage.removeItem(LocalStorage.TokenKeys.accessToken);
  }
  public static deleteRefreshToken() {
    localStorage.removeItem(LocalStorage.TokenKeys.refreshToken);
  }
  public static deleteTokens() {
    localStorage.removeItem(LocalStorage.TokenKeys.accessToken);
    localStorage.removeItem(LocalStorage.TokenKeys.refreshToken);
  }
  public static deleteCompanyCode() {
    localStorage.removeItem('company_code');
  }

  /** restore */
  public static restoreCompanyCode() {
    localStorage.setItem('company_code', companyCodeCache);
  }
}

export namespace LocalStorage {
  export enum TokenKeys {
    accessToken = 'accessToken',
    refreshToken = 'refreshToken',
  }
}
