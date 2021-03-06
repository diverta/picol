/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class ActivityService {
  /**
   *
   * ### **Comment::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **groupBy** `module_id`
   *
   * > **module_type** `topics`
   *
   * > **new_order_flg** `1`
   *
   * @param moduleId モジュールID
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param newOrderFlg To the display the newest use 1. Default: 0
   * @param cnt Display number per page
   * @param pageId Page ID
   * @param fromDate Posted Date
   * @param toDate Posted Date
   * @param type Grouping List as (array or object)
   * @param memberId Member ID
   * @result any
   * @throws ApiError
   */
  public static async getActivityServiceRcmsApi1Comments(
    requestParam: ActivityService.getActivityServiceRcmsApi1CommentsRequest,
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
          type: requestParam.type,
          'member_id[]': requestParam.memberId,
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
   * ### **Comment::insert (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **use_module_type** `topics`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postActivityServiceRcmsApi1CommentCreate(
    requestParam: ActivityService.postActivityServiceRcmsApi1CommentCreateRequest,
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
    return result;
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
   * @param commentId
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postActivityServiceRcmsApi1CommentDeleteCommentId(
    requestParam: ActivityService.postActivityServiceRcmsApi1CommentDeleteCommentIdRequest,
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
        path: `/rcms-api/1/comment/delete/${requestParam.commentId}`,
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

export namespace ActivityService {
  export interface getActivityServiceRcmsApi1CommentsRequest {
    moduleId: Array<number>;
    outputFormat?: string;
    lang?: string;
    charset?: string;
    newOrderFlg?: number;
    cnt?: number;
    pageId?: number;
    fromDate?: string;
    toDate?: string;
    type?: string;
    memberId?: Array<number>;
  }
  export type getActivityServiceRcmsApi1CommentsResponse = any;
  export interface postActivityServiceRcmsApi1CommentCreateRequest {
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
       * Activity
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
  export type postActivityServiceRcmsApi1CommentCreateResponse = any;
  export interface postActivityServiceRcmsApi1CommentDeleteCommentIdRequest {
    commentId: number;
    requestBody: {
      /**
       * 削除キー
       */
      delkey?: string;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postActivityServiceRcmsApi1CommentDeleteCommentIdResponse = any;
}
