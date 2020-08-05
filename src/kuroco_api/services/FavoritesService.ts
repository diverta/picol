/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';

export class FavoritesService {
  /**
   *
   * ### **Favorite::insert (v1)**
   *
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postFavoritesServiceRcmsApi1FavoriteCreate(
    requestParam: FavoritesService.postFavoritesServiceRcmsApi1FavoriteCreateRequest,
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
    return result.body;
  }
  /**
   *
   * ### **Favorite::delete (v1)**
   *
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postFavoritesServiceRcmsApi1FavoriteDelete(
    requestParam: FavoritesService.postFavoritesServiceRcmsApi1FavoriteDeleteRequest,
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
    return result.body;
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
   * > **groupAs** `array`
   *
   * > **module_type** `topics`
   *
   * > **order** `inst_ymdhi:desc`
   *
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param cnt Display number per page
   * @param pageId Page ID
   * @param moduleId
   * @param memberId Member ID
   * @param rcmsid rcmsid
   * @result any
   * @throws ApiError
   */
  public static async getFavoritesServiceRcmsApi1Favorites(
    requestParam: FavoritesService.getFavoritesServiceRcmsApi1FavoritesRequest,
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
        path: `/rcms-api/1/favorites`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          'module_id[]': requestParam.moduleId,
          'member_id[]': requestParam.memberId,
          'rcmsid[]': requestParam.rcmsid,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param cnt Display number per page
   * @param pageId Page ID
   * @param moduleId
   * @param groupBy Grouping List by (module_id)
   * @param groupAs Grouping List as (array or object)
   * @result any
   * @throws ApiError
   */
  public static async getFavoritesServiceRcmsApi1FavoritesMylist(
    requestParam: FavoritesService.getFavoritesServiceRcmsApi1FavoritesMylistRequest,
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
        path: `/rcms-api/1/favorites/mylist`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          'module_id[]': requestParam.moduleId,
          groupBy: requestParam.groupBy,
          groupAs: requestParam.groupAs,
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

export namespace FavoritesService {
  export interface postFavoritesServiceRcmsApi1FavoriteCreateRequest {
    requestBody: {
      /**
       * Module type
       */
      module_type:
        | 'group'
        | 'menu'
        | 'accesscount'
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
        | 'page'
        | 'ec';
      /**
       * module_id
       */
      module_id: number;
      /**
       * ページシステム名
       */
      page_sysnm?: string;
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
        | 'accesscount'
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
        | 'page'
        | 'ec';
      /**
       * module_id
       */
      module_id: number;
      /**
       * ページシステム名
       */
      page_sysnm?: string;
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
    rcmsid?: Array<string>;
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
    groupAs?: string;
  }
  export type getFavoritesServiceRcmsApi1FavoritesMylistResponse = any;
}
