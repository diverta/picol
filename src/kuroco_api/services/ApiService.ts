/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';

export class ApiService {
  /**
   *
   * ### **Api::request_api (v1)**
   *
   *
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getApiServiceRcmsApi1Slack(
    requestParam: ApiService.getApiServiceRcmsApi1SlackRequest,
  ): Promise<any> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'get',
        path: `/rcms-api/1/slack`,
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
    return result.body;
  }
  /**
   *
   * ### **Api::request_api (v1)**
   *
   *
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getApiServiceRcmsApi1Test2(
    requestParam: ApiService.getApiServiceRcmsApi1Test2Request,
  ): Promise<any> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'get',
        path: `/rcms-api/1/test2`,
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
    return result.body;
  }
  /**
   *
   * ### **Api::request_api (v1)**
   *
   *
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getApiServiceRcmsApi1Sendmail(
    requestParam: ApiService.getApiServiceRcmsApi1SendmailRequest,
  ): Promise<any> {
    const shouldHookToken =
      Object.keys({
        'Token-Auth': OpenAPI.SECURITY['Token-Auth'],
      }).length > 0;

    const request = async () =>
      await __request({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'get',
        path: `/rcms-api/1/sendmail`,
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
    return result.body;
  }
}

export namespace ApiService {
  export interface getApiServiceRcmsApi1SlackRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getApiServiceRcmsApi1SlackResponse = any;
  export interface getApiServiceRcmsApi1Test2Request {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getApiServiceRcmsApi1Test2Response = any;
  export interface getApiServiceRcmsApi1SendmailRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getApiServiceRcmsApi1SendmailResponse = any;
}
