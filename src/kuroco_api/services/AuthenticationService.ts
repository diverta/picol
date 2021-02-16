/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class AuthenticationService {
  /**
   *
   * ### **Login::login_challenge (v1)**
   *
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postAuthenticationServiceRcmsApi1Login(
    requestParam: AuthenticationService.postAuthenticationServiceRcmsApi1LoginRequest,
  ): Promise<Result<any>> {
    const shouldHookToken = Object.keys({}).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'post',
        path: `/rcms-api/1/login`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
        },
        body: requestParam.requestBody,
      });

    let result = await request();

    if (shouldHookToken && !result.ok && result.status === 401) {
      result = await import('../core/Auth').then(({ Auth }) => Auth.retryRequest(request, result));
    }

    catchGenericError(result);
    return result;
  }
  /**
   *
   * ### **Login::token (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **use_refresh_token** `true`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postAuthenticationServiceRcmsApi1Token(
    requestParam: AuthenticationService.postAuthenticationServiceRcmsApi1TokenRequest,
  ): Promise<Result<any>> {
    const shouldHookToken = Object.keys({}).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'post',
        path: `/rcms-api/1/token`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
        },
        body: requestParam.requestBody,
      });

    let result = await request();

    if (shouldHookToken && !result.ok && result.status === 401) {
      result = await import('../core/Auth').then(({ Auth }) => Auth.retryRequest(request, result));
    }

    catchGenericError(result);
    return result;
  }
  /**
   *
   * ### **Login::logout (v1)**
   *
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postAuthenticationServiceRcmsApi1Logout(
    requestParam: AuthenticationService.postAuthenticationServiceRcmsApi1LogoutRequest,
  ): Promise<Result<any>> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'post',
        path: `/rcms-api/1/logout`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
        },
      });

    let result = await request();

    if (shouldHookToken && !result.ok && result.status === 401) {
      result = await import('../core/Auth').then(({ Auth }) => Auth.retryRequest(request, result));
    }

    catchGenericError(result);
    return result;
  }
  /**
   *
   * ### **Login::profile (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **basic_info** `nickname,member_photo`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getAuthenticationServiceRcmsApi1Profile(
    requestParam: AuthenticationService.getAuthenticationServiceRcmsApi1ProfileRequest,
  ): Promise<Result<any>> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'get',
        path: `/rcms-api/1/profile`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
        },
      });

    let result = await request();

    if (shouldHookToken && !result.ok && result.status === 401) {
      result = await import('../core/Auth').then(({ Auth }) => Auth.retryRequest(request, result));
    }

    catchGenericError(result);
    return result;
  }
  /**
   *
   * ### **Login::firebaseToken (v1)**
   *
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postAuthenticationServiceRcmsApi1FirebaseToken(
    requestParam: AuthenticationService.postAuthenticationServiceRcmsApi1FirebaseTokenRequest,
  ): Promise<Result<any>> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'post',
        path: `/rcms-api/1/firebase_token`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
        },
      });

    let result = await request();

    if (shouldHookToken && !result.ok && result.status === 401) {
      result = await import('../core/Auth').then(({ Auth }) => Auth.retryRequest(request, result));
    }

    catchGenericError(result);
    return result;
  }
  /**
   *
   * ### **Login::gcs_info (v1)**
   *
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postAuthenticationServiceRcmsApi1GcsInfo(
    requestParam: AuthenticationService.postAuthenticationServiceRcmsApi1GcsInfoRequest,
  ): Promise<Result<any>> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'post',
        path: `/rcms-api/1/gcs_info`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
        },
      });

    let result = await request();

    if (shouldHookToken && !result.ok && result.status === 401) {
      result = await import('../core/Auth').then(({ Auth }) => Auth.retryRequest(request, result));
    }

    catchGenericError(result);
    return result;
  }
}

export namespace AuthenticationService {
  export interface postAuthenticationServiceRcmsApi1LoginRequest {
    requestBody: {
      /**
       * Login ID
       */
      email?: string;
      /**
       * Password
       */
      password?: string;
      /**
       * Log in automatically next time
       */
      login_save?: 0 | 1;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postAuthenticationServiceRcmsApi1LoginResponse = any;
  export interface postAuthenticationServiceRcmsApi1TokenRequest {
    requestBody: {
      /**
       * Resource grant token
       */
      grant_token?: string;
      /**
       * Refresh token
       */
      refresh_token?: string;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postAuthenticationServiceRcmsApi1TokenResponse = any;
  export interface postAuthenticationServiceRcmsApi1LogoutRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postAuthenticationServiceRcmsApi1LogoutResponse = any;
  export interface getAuthenticationServiceRcmsApi1ProfileRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getAuthenticationServiceRcmsApi1ProfileResponse = any;
  export interface postAuthenticationServiceRcmsApi1FirebaseTokenRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postAuthenticationServiceRcmsApi1FirebaseTokenResponse = any;
  export interface postAuthenticationServiceRcmsApi1GcsInfoRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postAuthenticationServiceRcmsApi1GcsInfoResponse = any;
}
