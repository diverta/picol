/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class FavoritesService {
  /**
   *
   * ### **Favorite::insert (v1)**
   *
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postFavoritesServiceRcmsApi1FavoriteCreate(
    requestParam: FavoritesService.postFavoritesServiceRcmsApi1FavoriteCreateRequest,
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
        path: `/rcms-api/1/favorite/create`,
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
   * ### **Favorite::delete (v1)**
   *
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postFavoritesServiceRcmsApi1FavoriteDelete(
    requestParam: FavoritesService.postFavoritesServiceRcmsApi1FavoriteDeleteRequest,
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
        path: `/rcms-api/1/favorite/delete`,
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
   * ### **Favorite::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **groupBy** `module_id`
   *
   * > **module_type** `topics`
   *
   * > **order** `inst_ymdhi:desc`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param cnt Display number per page
   * @param pageId Page ID
   * @param moduleId
   * @param memberId Member ID
   * @param type Grouping List as (array or object)
   * @result any
   * @throws ApiError
   */
  public static async getFavoritesServiceRcmsApi1Favorites(
    requestParam: FavoritesService.getFavoritesServiceRcmsApi1FavoritesRequest,
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
        path: `/rcms-api/1/favorites`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          'module_id[]': requestParam.moduleId,
          'member_id[]': requestParam.memberId,
          type: requestParam.type,
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
   * ### **Favorite::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **module_type** `topics`
   *
   * > **cnt** `10`
   *
   * > **order** `inst_ymdhi:desc`
   *
   * > **my_list** `1`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param cnt Display number per page
   * @param pageId Page ID
   * @param moduleId
   * @param groupBy Grouping List by (module_id)
   * @param type Grouping List as (array or object)
   * @result any
   * @throws ApiError
   */
  public static async getFavoritesServiceRcmsApi1FavoritesMylist(
    requestParam: FavoritesService.getFavoritesServiceRcmsApi1FavoritesMylistRequest,
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
        path: `/rcms-api/1/favorites/mylist`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          'module_id[]': requestParam.moduleId,
          groupBy: requestParam.groupBy,
          type: requestParam.type,
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

export namespace FavoritesService {
  export interface postFavoritesServiceRcmsApi1FavoriteCreateRequest {
    requestBody: {
      /**
       * Module type
       */
      module_type:
        | 'group'
        | 'menu'
        | 'comment'
        | 'inquiry'
        | 'login'
        | 'login_history'
        | 'member'
        | 'staticcontents'
        | 'site'
        | 'topics'
        | 'memberregist'
        | 'batch'
        | 'mailtemplateedit'
        | 'relation'
        | 'csvtable'
        | 'approvalflow'
        | 'api_googleanalytics'
        | 'onetime'
        | 'magazine'
        | 'tag'
        | 'api_webpush'
        | 'rcms_api'
        | 'firebase'
        | 'trigger'
        | 'ec';
      /**
       * module_id
       */
      module_id: number;
      /**
       * ページシステム名
       */
      page_sysnm?: string;
      /**
       * アクション種別
       */
      action_type?: number;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postFavoritesServiceRcmsApi1FavoriteCreateResponse = any;
  export interface postFavoritesServiceRcmsApi1FavoriteDeleteRequest {
    requestBody: {
      /**
       * Module type
       */
      module_type:
        | 'group'
        | 'menu'
        | 'comment'
        | 'inquiry'
        | 'login'
        | 'login_history'
        | 'member'
        | 'staticcontents'
        | 'site'
        | 'topics'
        | 'memberregist'
        | 'batch'
        | 'mailtemplateedit'
        | 'relation'
        | 'csvtable'
        | 'approvalflow'
        | 'api_googleanalytics'
        | 'onetime'
        | 'magazine'
        | 'tag'
        | 'api_webpush'
        | 'rcms_api'
        | 'firebase'
        | 'trigger'
        | 'ec';
      /**
       * module_id
       */
      module_id: number;
      /**
       * ページシステム名
       */
      page_sysnm?: string;
      /**
       * アクション種別
       */
      action_type?: number;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postFavoritesServiceRcmsApi1FavoriteDeleteResponse = any;
  export interface getFavoritesServiceRcmsApi1FavoritesRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
    moduleId?: Array<number>;
    memberId?: Array<number>;
    type?: string;
  }
  export type getFavoritesServiceRcmsApi1FavoritesResponse = any;
  export interface getFavoritesServiceRcmsApi1FavoritesMylistRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
    moduleId?: Array<number>;
    groupBy?: string;
    type?: string;
  }
  export type getFavoritesServiceRcmsApi1FavoritesMylistResponse = any;
}
