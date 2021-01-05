/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class MembersService {
  /**
   *
   * ### **Member::details (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **group_id** `1`
   *
   * @param memberId
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getMembersServiceRcmsApi1MembersMemberId(
    requestParam: MembersService.getMembersServiceRcmsApi1MembersMemberIdRequest,
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
        path: `/rcms-api/1/members/${requestParam.memberId}`,
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
   * ### **Member::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **subData_flg** `1`
   *
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param id Member ID
   * @param cnt Number of topics per page
   * @param pageId Page ID
   * @param sName Member search
   * @param sEmail Member search
   * @param sTel Member search
   * @param sAddress Member search
   * @param sTdfkCd Member search
   * @param groupId Member search
   * @result any
   * @throws ApiError
   */
  public static async getMembersServiceRcmsApi1Members(
    requestParam: MembersService.getMembersServiceRcmsApi1MembersRequest,
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
        path: `/rcms-api/1/members`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          'id[]': requestParam.id,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          s_name: requestParam.sName,
          s_email: requestParam.sEmail,
          s_tel: requestParam.sTel,
          s_address: requestParam.sAddress,
          s_tdfk_cd: requestParam.sTdfkCd,
          group_id: requestParam.groupId,
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
   * ### **Member::update (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **self_only** `true`
   *
   * > **unuse_columns** `email`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postMembersServiceRcmsApi1MemberUpdate(
    requestParam: MembersService.postMembersServiceRcmsApi1MemberUpdateRequest,
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
        path: `/rcms-api/1/member/update`,
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
}

export namespace MembersService {
  export interface getMembersServiceRcmsApi1MembersMemberIdRequest {
    memberId: number;
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getMembersServiceRcmsApi1MembersMemberIdResponse = any;
  export interface getMembersServiceRcmsApi1MembersRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    id?: Array<number>;
    cnt?: number;
    pageId?: number;
    sName?: string;
    sEmail?: string;
    sTel?: string;
    sAddress?: string;
    sTdfkCd?: string;
    groupId?: number;
  }
  export type getMembersServiceRcmsApi1MembersResponse = any;
  export interface postMembersServiceRcmsApi1MemberUpdateRequest {
    requestBody: {
      /**
       * Nickname
       */
      nickname?: string;
      /**
       * Image1
       */
      image?: {
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * File name
         */
        file_nm?: string;
        /**
         * Description
         */
        desc?: string;
        extension?: 'jpg' | 'gif' | 'png';
      };
      /**
       * Password
       */
      login_pwd?: string;
      /**
       * /label/group_id
       */
      group_id?: Array<1 | 2 | 101 | 102>;
      /**
       * /label/open_flg
       */
      open_flg?: 0 | 1;
      /**
       * /label/login_ok_flg
       */
      login_ok_flg?: 0 | 1;
      /**
       * Validate
       */
      validate_only?: boolean;
      auto_login?: number;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postMembersServiceRcmsApi1MemberUpdateResponse = any;
}
