/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

let companyCdCache = '';

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
  public static getCompanyCd() {
    return localStorage.getItem('company_cd');
  }

  /** set */
  public static setAccessToken(token: string) {
    localStorage.setItem(LocalStorage.TokenKeys.accessToken, token);
  }
  public static setRefreshToken(token: string) {
    localStorage.setItem(LocalStorage.TokenKeys.refreshToken, token);
  }
  public static setCompanyCd(companyCd: string) {
    companyCdCache = LocalStorage.getCompanyCd() || '';
    localStorage.setItem('company_cd', companyCd);
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
  public static deleteCompanyCd() {
    localStorage.removeItem('company_cd');
  }

  /** restore */
  public static restoreCompanyCd() {
    localStorage.setItem('company_cd', companyCdCache);
  }
}

export namespace LocalStorage {
  export enum TokenKeys {
    accessToken = 'accessToken',
    refreshToken = 'refreshToken',
  }
}
