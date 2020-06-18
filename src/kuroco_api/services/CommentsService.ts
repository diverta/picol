/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';

export class CommentsService {
  /**
   *
   * ### **Comment::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **groupBy** `module_id`
   *
   * > **groupAs** `array`
   *
   * > **module_type** `topics`
   *
   * > **new_order_flg** `1`
   *
   * @param moduleId モジュールID
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param newOrderFlg To the display the newest use 1. Default: 0
   * @param cnt Display number per page
   * @param pageId Page ID
   * @param fromDate Posted Date
   * @param toDate Posted Date
   * @result any
   * @throws ApiError
   */
  public static async getCommentsServiceRcmsApi1Comments(
    requestParam: CommentsService.getCommentsServiceRcmsApi1CommentsRequest,
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
        path: `/rcms-api/1/comments`,
        query: {
          'module_id[]': requestParam.moduleId,
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          new_order_flg: requestParam.newOrderFlg,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          from_date: requestParam.fromDate,
          to_date: requestParam.toDate,
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
   * ### **Comment::insert (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **use_module_type** `topics`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postCommentsServiceRcmsApi1CommentCreate(
    requestParam: CommentsService.postCommentsServiceRcmsApi1CommentCreateRequest,
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
        method: 'post',
        path: `/rcms-api/1/comment/create`,
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
    return result.body;
  }
  /**
   *
   * ### **Comment::delete (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **use_module_type** `topics`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postCommentsServiceRcmsApi1CommentDelete(
    requestParam: CommentsService.postCommentsServiceRcmsApi1CommentDeleteRequest,
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
        method: 'post',
        path: `/rcms-api/1/comment/delete`,
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
    return result.body;
  }
}

export namespace CommentsService {
  export interface getCommentsServiceRcmsApi1CommentsRequest {
    moduleId: Array<number>;
    outputFormat?: string;
    lang?: string;
    charset?: string;
    newOrderFlg?: number;
    cnt?: number;
    pageId?: number;
    fromDate?: string;
    toDate?: string;
  }
  export type getCommentsServiceRcmsApi1CommentsResponse = any;
  export interface postCommentsServiceRcmsApi1CommentCreateRequest {
    requestBody: {
      /**
       * モジュールID
       */
      module_id: number;
      /**
       * Name
       */
      name: string;
      /**
       * Mail
       */
      mail?: string;
      /**
       * URL
       */
      url?: string;
      /**
       * Comments
       */
      note: string;
      /**
       * 削除キー
       */
      delkey?: string;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postCommentsServiceRcmsApi1CommentCreateResponse = any;
  export interface postCommentsServiceRcmsApi1CommentDeleteRequest {
    requestBody: {
      /**
       * コメントID
       */
      comment_id: number;
      /**
       * 削除キー
       */
      delkey?: string;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postCommentsServiceRcmsApi1CommentDeleteResponse = any;
}
