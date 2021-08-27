/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class TagsService {
  /**
   *
   * ### **Tag::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **groupBy** `module_id`
   *
   * @param moduleId module_id
   * @param moduleType Module type
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param order Set the sort order. Available param {0}
   * @param pageId Page ID
   * @param id Tag IDs that you would like to display
   * @param categoryId ID of the tag category to be displayed. (Default: All)
   * @param type Grouping List as (array|object)
   * @result any
   * @throws ApiError
   */
  public static async getTagsServiceRcmsApi1Tags(
    requestParam: TagsService.getTagsServiceRcmsApi1TagsRequest,
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
        path: `/rcms-api/1/tags`,
        query: {
          'module_id[]': requestParam.moduleId,
          module_type: requestParam.moduleType,
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          'order[]': requestParam.order,
          pageID: requestParam.pageId,
          'id[]': requestParam.id,
          'category_id[]': requestParam.categoryId,
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
   * ### **Tag::insert (v1)**
   *
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postTagsServiceRcmsApi1TagCreate(
    requestParam: TagsService.postTagsServiceRcmsApi1TagCreateRequest,
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
        path: `/rcms-api/1/tag/create`,
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
   * ### **Tag::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **groupBy** `category`
   *
   * > **order** `category_weight:desc`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param order Set the sort order. Available param {0}
   * @param pageId Page ID
   * @param id Tag IDs that you would like to display
   * @param categoryId ID of the tag category to be displayed. (Default: All)
   * @param type Grouping List as (array|object)
   * @result any
   * @throws ApiError
   */
  public static async getTagsServiceRcmsApi1TagsCategoryGrouped(
    requestParam: TagsService.getTagsServiceRcmsApi1TagsCategoryGroupedRequest,
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
        path: `/rcms-api/1/tags/category_grouped`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          'order[]': requestParam.order,
          pageID: requestParam.pageId,
          'id[]': requestParam.id,
          'category_id[]': requestParam.categoryId,
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

export namespace TagsService {
  export interface getTagsServiceRcmsApi1TagsRequest {
    moduleId: Array<number>;
    moduleType: string;
    outputFormat?: string;
    lang?: string;
    charset?: string;
    order?: Array<string>;
    pageId?: number;
    id?: Array<number>;
    categoryId?: Array<number>;
    type?: string;
  }
  export type getTagsServiceRcmsApi1TagsResponse = any;
  export interface postTagsServiceRcmsApi1TagCreateRequest {
    requestBody: {
      /**
       * Title
       */
      tag_nm: string;
      /**
       * Category ID
       * * 0 => Uncategorized
       * * 1 => Recommend
       * * 2 => Menu
       */
      tag_category_id?: 0 | 1 | 2;
      /**
       * Published / Not published
       */
      open_flg?: 0 | 1;
      /**
       * Sort
       */
      weight?: number;
      /**
       * ext_col_01
       */
      ext_col_01?: string;
      /**
       * ext_col_02
       */
      ext_col_02?: string;
      /**
       * ext_col_03
       */
      ext_col_03?: string;
      /**
       * ext_col_04
       */
      ext_col_04?: string;
      /**
       * ext_col_05
       */
      ext_col_05?: string;
      /**
       * ext_col_06
       */
      ext_col_06?: string;
      /**
       * ext_col_07
       */
      ext_col_07?: string;
      /**
       * ext_col_08
       */
      ext_col_08?: string;
      /**
       * ext_col_09
       */
      ext_col_09?: string;
      /**
       * ext_col_10
       */
      ext_col_10?: string;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postTagsServiceRcmsApi1TagCreateResponse = any;
  export interface getTagsServiceRcmsApi1TagsCategoryGroupedRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    order?: Array<string>;
    pageId?: number;
    id?: Array<number>;
    categoryId?: Array<number>;
    type?: string;
  }
  export type getTagsServiceRcmsApi1TagsCategoryGroupedResponse = any;
}
