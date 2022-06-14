/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class ContentService {
  /**
   *
   * ### **Topics::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * > **cnt** `9`
   *
   * > **tag_cond** `AND`
   *
   * > **tag_search** `1`
   *
   * > **order** `ymd:desc,topics_id:desc`
   *
   * > **get_comment_cnt** `1`
   *
   * > **get_favorite_cnt** `1`
   *
   * > **add_my_favorite_flg** `1`
   *
   * > **get_tag_flg** `1`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
   * @param filter Filter query
   * @param customSearchId search contdition
   * @param topicsKeyword Keyword
   * @param topicsKeywordCond Change the way of narrowing down by keyword (Default: AND)
   * @param contentsType The ID from the displayed category. All data will be displayed when this is not set.
   * @param contentsTypeCond Change the way of narrowing down by category ID (Default: OR)
   * @param date Date
   * @param usingSeason Use season (Yes: 1 | No: 0)
   * @param season Season
   * @param extColumnCond ext_column condition type (Default:OR)<br>
   * To specify an ext_col number set: 'ext_column_{no}_cond'
   * @param excludeTopicsId IDs of the excluded topics
   * @param tagCategoryId ID of the tag category to be displayed. (Default: All)
   * @param tagSearch narrowed by the value of the tag id.  yes:1 no:0
   * @param tagId Tag IDs that you would like to display
   * @param tagCond Change the way to narrow down tags (Default: OR)
   * @param excludeTagId Tag IDs that you would like to hide
   * @param myFavoriteList
   * @param myCommentList
   * @param myOwnList
   * @param order Set the sort order. Available param {0}
   * @param orderById
   * @param id IDs of the displayed topics
   * @param type List type as (array or object)
   * @param groupBy Grouping List by (category)
   * @param groupByCategoryId Category id list (using with groupBy category)
   * @param showEmptyCategories Show empty category info (using with groupBy category)
   * @param orderByCategoryCount Order by category contents count (using with groupBy category)
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1Feeds(
    requestParam: ContentService.getContentServiceRcmsApi1FeedsRequest,
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
        path: `/rcms-api/1/feeds`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          filter: requestParam.filter,
          custom_search_id: requestParam.customSearchId,
          topics_keyword: requestParam.topicsKeyword,
          topics_keyword_cond: requestParam.topicsKeywordCond,
          'contents_type[]': requestParam.contentsType,
          contents_type_cond: requestParam.contentsTypeCond,
          date: requestParam.date,
          using_season: requestParam.usingSeason,
          season: requestParam.season,
          ext_column_cond: requestParam.extColumnCond,
          exclude_topics_id: requestParam.excludeTopicsId,
          tag_category_id: requestParam.tagCategoryId,
          tag_search: requestParam.tagSearch,
          'tag_id[]': requestParam.tagId,
          tag_cond: requestParam.tagCond,
          exclude_tag_id: requestParam.excludeTagId,
          my_favorite_list: requestParam.myFavoriteList,
          my_comment_list: requestParam.myCommentList,
          my_own_list: requestParam.myOwnList,
          order: requestParam.order,
          order_by_id: requestParam.orderById,
          'id[]': requestParam.id,
          type: requestParam.type,
          groupBy: requestParam.groupBy,
          'group_by_category_id[]': requestParam.groupByCategoryId,
          show_empty_categories: requestParam.showEmptyCategories,
          order_by_category_count: requestParam.orderByCategoryCount,
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
   * ### **Topics::insert (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postContentServiceRcmsApi1FeedCreate(
    requestParam: ContentService.postContentServiceRcmsApi1FeedCreateRequest,
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
        path: `/rcms-api/1/feed/create`,
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
   * ### **Topics::delete (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * @param topicsId
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postContentServiceRcmsApi1FeedDeleteTopicsId(
    requestParam: ContentService.postContentServiceRcmsApi1FeedDeleteTopicsIdRequest,
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
        path: `/rcms-api/1/feed/delete/${requestParam.topicsId}`,
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
   * ### **Topics::update (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * @param topicsId
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postContentServiceRcmsApi1FeedUpdateTopicsId(
    requestParam: ContentService.postContentServiceRcmsApi1FeedUpdateTopicsIdRequest,
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
        path: `/rcms-api/1/feed/update/${requestParam.topicsId}`,
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
   * ### **TopicsGroup::details (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1Tg(
    requestParam: ContentService.getContentServiceRcmsApi1TgRequest,
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
        path: `/rcms-api/1/tg`,
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
   * ### **TopicsGroup::details (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * > **ext_config_flg** `1`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1FeedGroup(
    requestParam: ContentService.getContentServiceRcmsApi1FeedGroupRequest,
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
        path: `/rcms-api/1/feed-group`,
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
   * ### **Topics::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `5`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
   * @param filter Filter query
   * @param customSearchId search contdition
   * @param topicsKeyword Keyword
   * @param topicsKeywordCond Change the way of narrowing down by keyword (Default: AND)
   * @param contentsType The ID from the displayed category. All data will be displayed when this is not set.
   * @param contentsTypeCond Change the way of narrowing down by category ID (Default: OR)
   * @param date Date
   * @param usingSeason Use season (Yes: 1 | No: 0)
   * @param season Season
   * @param extColumnCond ext_column condition type (Default:OR)<br>
   * To specify an ext_col number set: 'ext_column_{no}_cond'
   * @param excludeTopicsId IDs of the excluded topics
   * @param tagCategoryId ID of the tag category to be displayed. (Default: All)
   * @param tagSearch narrowed by the value of the tag id.  yes:1 no:0
   * @param tagId Tag IDs that you would like to display
   * @param tagCond Change the way to narrow down tags (Default: OR)
   * @param excludeTagId Tag IDs that you would like to hide
   * @param myFavoriteList
   * @param myCommentList
   * @param myOwnList
   * @param order Set the sort order. Available param {0}
   * @param orderById
   * @param id IDs of the displayed topics
   * @param type List type as (array or object)
   * @param groupBy Grouping List by (category)
   * @param groupByCategoryId Category id list (using with groupBy category)
   * @param showEmptyCategories Show empty category info (using with groupBy category)
   * @param orderByCategoryCount Order by category contents count (using with groupBy category)
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1Infos(
    requestParam: ContentService.getContentServiceRcmsApi1InfosRequest,
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
        path: `/rcms-api/1/infos`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          filter: requestParam.filter,
          custom_search_id: requestParam.customSearchId,
          topics_keyword: requestParam.topicsKeyword,
          topics_keyword_cond: requestParam.topicsKeywordCond,
          'contents_type[]': requestParam.contentsType,
          contents_type_cond: requestParam.contentsTypeCond,
          date: requestParam.date,
          using_season: requestParam.usingSeason,
          season: requestParam.season,
          ext_column_cond: requestParam.extColumnCond,
          exclude_topics_id: requestParam.excludeTopicsId,
          tag_category_id: requestParam.tagCategoryId,
          tag_search: requestParam.tagSearch,
          'tag_id[]': requestParam.tagId,
          tag_cond: requestParam.tagCond,
          exclude_tag_id: requestParam.excludeTagId,
          my_favorite_list: requestParam.myFavoriteList,
          my_comment_list: requestParam.myCommentList,
          my_own_list: requestParam.myOwnList,
          order: requestParam.order,
          order_by_id: requestParam.orderById,
          'id[]': requestParam.id,
          type: requestParam.type,
          groupBy: requestParam.groupBy,
          'group_by_category_id[]': requestParam.groupByCategoryId,
          show_empty_categories: requestParam.showEmptyCategories,
          order_by_category_count: requestParam.orderByCategoryCount,
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
   * ### **Topics::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `6`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
   * @param filter Filter query
   * @param customSearchId search contdition
   * @param topicsKeyword Keyword
   * @param topicsKeywordCond Change the way of narrowing down by keyword (Default: AND)
   * @param contentsType The ID from the displayed category. All data will be displayed when this is not set.
   * @param contentsTypeCond Change the way of narrowing down by category ID (Default: OR)
   * @param date Date
   * @param usingSeason Use season (Yes: 1 | No: 0)
   * @param season Season
   * @param extColumnCond ext_column condition type (Default:OR)<br>
   * To specify an ext_col number set: 'ext_column_{no}_cond'
   * @param excludeTopicsId IDs of the excluded topics
   * @param tagCategoryId ID of the tag category to be displayed. (Default: All)
   * @param tagSearch narrowed by the value of the tag id.  yes:1 no:0
   * @param tagId Tag IDs that you would like to display
   * @param tagCond Change the way to narrow down tags (Default: OR)
   * @param excludeTagId Tag IDs that you would like to hide
   * @param myFavoriteList
   * @param myCommentList
   * @param myOwnList
   * @param order Set the sort order. Available param {0}
   * @param orderById
   * @param id IDs of the displayed topics
   * @param type List type as (array or object)
   * @param groupBy Grouping List by (category)
   * @param groupByCategoryId Category id list (using with groupBy category)
   * @param showEmptyCategories Show empty category info (using with groupBy category)
   * @param orderByCategoryCount Order by category contents count (using with groupBy category)
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1PreInfo(
    requestParam: ContentService.getContentServiceRcmsApi1PreInfoRequest,
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
        path: `/rcms-api/1/pre_info`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          filter: requestParam.filter,
          custom_search_id: requestParam.customSearchId,
          topics_keyword: requestParam.topicsKeyword,
          topics_keyword_cond: requestParam.topicsKeywordCond,
          'contents_type[]': requestParam.contentsType,
          contents_type_cond: requestParam.contentsTypeCond,
          date: requestParam.date,
          using_season: requestParam.usingSeason,
          season: requestParam.season,
          ext_column_cond: requestParam.extColumnCond,
          exclude_topics_id: requestParam.excludeTopicsId,
          tag_category_id: requestParam.tagCategoryId,
          tag_search: requestParam.tagSearch,
          'tag_id[]': requestParam.tagId,
          tag_cond: requestParam.tagCond,
          exclude_tag_id: requestParam.excludeTagId,
          my_favorite_list: requestParam.myFavoriteList,
          my_comment_list: requestParam.myCommentList,
          my_own_list: requestParam.myOwnList,
          order: requestParam.order,
          order_by_id: requestParam.orderById,
          'id[]': requestParam.id,
          type: requestParam.type,
          groupBy: requestParam.groupBy,
          'group_by_category_id[]': requestParam.groupByCategoryId,
          show_empty_categories: requestParam.showEmptyCategories,
          order_by_category_count: requestParam.orderByCategoryCount,
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
   * ### **Topics::preview (v1)**
   *
   *
   * @param previewToken Preview token
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1Preview(
    requestParam: ContentService.getContentServiceRcmsApi1PreviewRequest,
  ): Promise<Result<any>> {
    const shouldHookToken = Object.keys({}).length > 0;

    const request = async () =>
      await __request<any>({
        headers: shouldHookToken
          ? { [(OpenAPI.SECURITY['Token-Auth'] as any).name]: `${LocalStorage.getAccessToken()}` }
          : {},
        method: 'get',
        path: `/rcms-api/1/preview`,
        query: {
          preview_token: requestParam.previewToken,
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
   * ### **Topics::list (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
   * @param filter Filter query
   * @param customSearchId search contdition
   * @param topicsKeyword Keyword
   * @param topicsKeywordCond Change the way of narrowing down by keyword (Default: AND)
   * @param contentsType The ID from the displayed category. All data will be displayed when this is not set.
   * @param contentsTypeCond Change the way of narrowing down by category ID (Default: OR)
   * @param date Date
   * @param usingSeason Use season (Yes: 1 | No: 0)
   * @param season Season
   * @param extColumnCond ext_column condition type (Default:OR)<br>
   * To specify an ext_col number set: 'ext_column_{no}_cond'
   * @param excludeTopicsId IDs of the excluded topics
   * @param tagCategoryId ID of the tag category to be displayed. (Default: All)
   * @param tagSearch narrowed by the value of the tag id.  yes:1 no:0
   * @param tagId Tag IDs that you would like to display
   * @param tagCond Change the way to narrow down tags (Default: OR)
   * @param excludeTagId Tag IDs that you would like to hide
   * @param myFavoriteList
   * @param myCommentList
   * @param myOwnList
   * @param order Set the sort order. Available param {0}
   * @param orderById
   * @param id IDs of the displayed topics
   * @param type List type as (array or object)
   * @param groupBy Grouping List by (category)
   * @param groupByCategoryId Category id list (using with groupBy category)
   * @param showEmptyCategories Show empty category info (using with groupBy category)
   * @param orderByCategoryCount Order by category contents count (using with groupBy category)
   * @result any
   * @throws ApiError
   */
  public static async getContentServiceRcmsApi1Test(
    requestParam: ContentService.getContentServiceRcmsApi1TestRequest,
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
        path: `/rcms-api/1/test`,
        query: {
          _output_format: requestParam.outputFormat,
          _lang: requestParam.lang,
          _charset: requestParam.charset,
          cnt: requestParam.cnt,
          pageID: requestParam.pageId,
          filter: requestParam.filter,
          custom_search_id: requestParam.customSearchId,
          topics_keyword: requestParam.topicsKeyword,
          topics_keyword_cond: requestParam.topicsKeywordCond,
          'contents_type[]': requestParam.contentsType,
          contents_type_cond: requestParam.contentsTypeCond,
          date: requestParam.date,
          using_season: requestParam.usingSeason,
          season: requestParam.season,
          ext_column_cond: requestParam.extColumnCond,
          exclude_topics_id: requestParam.excludeTopicsId,
          tag_category_id: requestParam.tagCategoryId,
          tag_search: requestParam.tagSearch,
          'tag_id[]': requestParam.tagId,
          tag_cond: requestParam.tagCond,
          exclude_tag_id: requestParam.excludeTagId,
          my_favorite_list: requestParam.myFavoriteList,
          my_comment_list: requestParam.myCommentList,
          my_own_list: requestParam.myOwnList,
          order: requestParam.order,
          order_by_id: requestParam.orderById,
          'id[]': requestParam.id,
          type: requestParam.type,
          groupBy: requestParam.groupBy,
          'group_by_category_id[]': requestParam.groupByCategoryId,
          show_empty_categories: requestParam.showEmptyCategories,
          order_by_category_count: requestParam.orderByCategoryCount,
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
   * ### **Topics::insert (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **topics_group_id** `1`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postContentServiceRcmsApi1Test(
    requestParam: ContentService.postContentServiceRcmsApi1TestRequest,
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
        path: `/rcms-api/1/test`,
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

export namespace ContentService {
  export interface getContentServiceRcmsApi1FeedsRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
    filter?: string;
    customSearchId?: string;
    topicsKeyword?: string;
    topicsKeywordCond?: string;
    contentsType?: Array<number>;
    contentsTypeCond?: string;
    date?: string;
    usingSeason?: string;
    season?: number;
    extColumnCond?: string;
    excludeTopicsId?: string;
    tagCategoryId?: number;
    tagSearch?: string;
    tagId?: Array<number>;
    tagCond?: string;
    excludeTagId?: string;
    myFavoriteList?: number;
    myCommentList?: number;
    myOwnList?: string;
    order?: string;
    orderById?: string;
    id?: Array<number>;
    type?: string;
    groupBy?: string;
    groupByCategoryId?: Array<number>;
    showEmptyCategories?: boolean;
    orderByCategoryCount?: boolean;
  }
  export type getContentServiceRcmsApi1FeedsResponse = any;
  export interface postContentServiceRcmsApi1FeedCreateRequest {
    requestBody: {
      /**
       * Topic title
       */
      subject: string;
      /**
       * Slug
       */
      slug?: string;
      /**
       * Category ID
       * * 1 => フィード
       */
      contents_type?: 1;
      /**
       * Published / Not published
       */
      open_flg?: 0 | 1;
      /**
       * Display all topics to logged in members, regardless ther public/hidden status
       */
      topics_flg?: 0 | 1;
      /**
       * Contents
       */
      contents?: string;
      /**
       * display up
       */
      regular_flg?: number;
      /**
       * Date
       */
      ymd?: string;
      /**
       * タグID
       * * 75 => 推しキャラ(Favorite character)
       * * 76 => いい感じの何か(good stuff)
       * * 67 => 近況(Now)
       * * 68 => ランチ(Lunch)
       * * 69 => おやつ(Snack)
       * * 70 => 仕事関係
       * * 71 => ただしい(Do right)
       * * 72 => たのしい(Delight)
       * * 73 => ジレンマ(dilemma)
       * * 74 => めでたい
       * * 162 => おやつ
       * * 163 => sakura
       * * 164 => 桜
       * * 166 => 景色
       * * 171 => 重要なお知らせ
       * * 173 => ここにタグを設置できます
       * * 174 => MalaysiaOffice
       * * 175 => 近況
       * * 176 => 近所のお店
       * * 177 => #テスト
       * * 178 => テスト投稿1
       * * 179 => aaa
       * * 180 => 飯田橋リニューアル!
       * * 181 => ttt
       * * 182 => #CCS事例紹介 #ミルトス
       * * 183 => CCS事例紹介
       * * 184 => #ミルトス
       * * 185 => パジャ・ポス
       * * 186 => new tag1
       * * 187 => 花束
       * * 188 => Gaandu
       * * 189 => #長濱ねる
       * * 190 => testtest
       */
      tag_id?: Array<
        | 75
        | 76
        | 67
        | 68
        | 69
        | 70
        | 71
        | 72
        | 73
        | 74
        | 162
        | 163
        | 164
        | 166
        | 171
        | 173
        | 174
        | 175
        | 176
        | 177
        | 178
        | 179
        | 180
        | 181
        | 182
        | 183
        | 184
        | 185
        | 186
        | 187
        | 188
        | 189
        | 190
      >;
      /**
       * GCSファイル
       */
      ext_col_04?: Array<{
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * Description
         */
        desc?: string;
        /**
         * File ID. Whether the item should be updated or inserted depends on this ID being set or not.
         */
        id?: string;
      }>;
      /**
       * 動画
       */
      ext_col_06?: {
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * Description
         */
        desc?: string;
      };
      /**
       * コメント
       */
      ext_col_02?: string;
      /**
       * Validate
       */
      validate_only?: boolean;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postContentServiceRcmsApi1FeedCreateResponse = any;
  export interface postContentServiceRcmsApi1FeedDeleteTopicsIdRequest {
    topicsId: number;
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postContentServiceRcmsApi1FeedDeleteTopicsIdResponse = any;
  export interface postContentServiceRcmsApi1FeedUpdateTopicsIdRequest {
    topicsId: number;
    requestBody: {
      /**
       * Topic title
       */
      subject?: string;
      /**
       * Slug
       */
      slug?: string;
      /**
       * Category ID
       * * 1 => フィード
       */
      contents_type?: 1;
      /**
       * Published / Not published
       */
      open_flg?: 0 | 1;
      /**
       * Display all topics to logged in members, regardless ther public/hidden status
       */
      topics_flg?: 0 | 1;
      /**
       * Contents
       */
      contents?: string;
      /**
       * display up
       */
      regular_flg?: number;
      /**
       * Date
       */
      ymd?: string;
      /**
       * タグID
       * * 75 => 推しキャラ(Favorite character)
       * * 76 => いい感じの何か(good stuff)
       * * 67 => 近況(Now)
       * * 68 => ランチ(Lunch)
       * * 69 => おやつ(Snack)
       * * 70 => 仕事関係
       * * 71 => ただしい(Do right)
       * * 72 => たのしい(Delight)
       * * 73 => ジレンマ(dilemma)
       * * 74 => めでたい
       * * 162 => おやつ
       * * 163 => sakura
       * * 164 => 桜
       * * 166 => 景色
       * * 171 => 重要なお知らせ
       * * 173 => ここにタグを設置できます
       * * 174 => MalaysiaOffice
       * * 175 => 近況
       * * 176 => 近所のお店
       * * 177 => #テスト
       * * 178 => テスト投稿1
       * * 179 => aaa
       * * 180 => 飯田橋リニューアル!
       * * 181 => ttt
       * * 182 => #CCS事例紹介 #ミルトス
       * * 183 => CCS事例紹介
       * * 184 => #ミルトス
       * * 185 => パジャ・ポス
       * * 186 => new tag1
       * * 187 => 花束
       * * 188 => Gaandu
       * * 189 => #長濱ねる
       * * 190 => testtest
       */
      tag_id?: Array<
        | 75
        | 76
        | 67
        | 68
        | 69
        | 70
        | 71
        | 72
        | 73
        | 74
        | 162
        | 163
        | 164
        | 166
        | 171
        | 173
        | 174
        | 175
        | 176
        | 177
        | 178
        | 179
        | 180
        | 181
        | 182
        | 183
        | 184
        | 185
        | 186
        | 187
        | 188
        | 189
        | 190
      >;
      /**
       * GCSファイル
       */
      ext_col_04?: Array<{
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * Description
         */
        desc?: string;
        /**
         * File ID. Whether the item should be updated or inserted depends on this ID being set or not.
         */
        id?: string;
      }>;
      /**
       * 動画
       */
      ext_col_06?: {
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * Description
         */
        desc?: string;
      };
      /**
       * コメント
       */
      ext_col_02?: string;
      /**
       * Validate
       */
      validate_only?: boolean;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postContentServiceRcmsApi1FeedUpdateTopicsIdResponse = any;
  export interface getContentServiceRcmsApi1TgRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getContentServiceRcmsApi1TgResponse = any;
  export interface getContentServiceRcmsApi1FeedGroupRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getContentServiceRcmsApi1FeedGroupResponse = any;
  export interface getContentServiceRcmsApi1InfosRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
    filter?: string;
    customSearchId?: string;
    topicsKeyword?: string;
    topicsKeywordCond?: string;
    contentsType?: Array<number>;
    contentsTypeCond?: string;
    date?: string;
    usingSeason?: string;
    season?: number;
    extColumnCond?: string;
    excludeTopicsId?: string;
    tagCategoryId?: number;
    tagSearch?: string;
    tagId?: Array<number>;
    tagCond?: string;
    excludeTagId?: string;
    myFavoriteList?: number;
    myCommentList?: number;
    myOwnList?: string;
    order?: string;
    orderById?: string;
    id?: Array<number>;
    type?: string;
    groupBy?: string;
    groupByCategoryId?: Array<number>;
    showEmptyCategories?: boolean;
    orderByCategoryCount?: boolean;
  }
  export type getContentServiceRcmsApi1InfosResponse = any;
  export interface getContentServiceRcmsApi1PreInfoRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
    filter?: string;
    customSearchId?: string;
    topicsKeyword?: string;
    topicsKeywordCond?: string;
    contentsType?: Array<number>;
    contentsTypeCond?: string;
    date?: string;
    usingSeason?: string;
    season?: number;
    extColumnCond?: string;
    excludeTopicsId?: string;
    tagCategoryId?: number;
    tagSearch?: string;
    tagId?: Array<number>;
    tagCond?: string;
    excludeTagId?: string;
    myFavoriteList?: number;
    myCommentList?: number;
    myOwnList?: string;
    order?: string;
    orderById?: string;
    id?: Array<number>;
    type?: string;
    groupBy?: string;
    groupByCategoryId?: Array<number>;
    showEmptyCategories?: boolean;
    orderByCategoryCount?: boolean;
  }
  export type getContentServiceRcmsApi1PreInfoResponse = any;
  export interface getContentServiceRcmsApi1PreviewRequest {
    previewToken: string;
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getContentServiceRcmsApi1PreviewResponse = any;
  export interface getContentServiceRcmsApi1TestRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
    filter?: string;
    customSearchId?: string;
    topicsKeyword?: string;
    topicsKeywordCond?: string;
    contentsType?: Array<number>;
    contentsTypeCond?: string;
    date?: string;
    usingSeason?: string;
    season?: number;
    extColumnCond?: string;
    excludeTopicsId?: string;
    tagCategoryId?: number;
    tagSearch?: string;
    tagId?: Array<number>;
    tagCond?: string;
    excludeTagId?: string;
    myFavoriteList?: number;
    myCommentList?: number;
    myOwnList?: string;
    order?: string;
    orderById?: string;
    id?: Array<number>;
    type?: string;
    groupBy?: string;
    groupByCategoryId?: Array<number>;
    showEmptyCategories?: boolean;
    orderByCategoryCount?: boolean;
  }
  export type getContentServiceRcmsApi1TestResponse = any;
  export interface postContentServiceRcmsApi1TestRequest {
    requestBody: {
      /**
       * Topic title
       */
      subject: string;
      /**
       * Slug
       */
      slug?: string;
      /**
       * Category ID
       * * 1 => フィード
       */
      contents_type?: 1;
      /**
       * Published / Not published
       */
      open_flg?: 0 | 1;
      /**
       * Display all topics to logged in members, regardless ther public/hidden status
       */
      topics_flg?: 0 | 1;
      /**
       * Contents
       */
      contents?: string;
      /**
       * display up
       */
      regular_flg?: number;
      /**
       * Date
       */
      ymd?: string;
      /**
       * タグID
       * * 75 => 推しキャラ(Favorite character)
       * * 76 => いい感じの何か(good stuff)
       * * 67 => 近況(Now)
       * * 68 => ランチ(Lunch)
       * * 69 => おやつ(Snack)
       * * 70 => 仕事関係
       * * 71 => ただしい(Do right)
       * * 72 => たのしい(Delight)
       * * 73 => ジレンマ(dilemma)
       * * 74 => めでたい
       * * 162 => おやつ
       * * 163 => sakura
       * * 164 => 桜
       * * 166 => 景色
       * * 171 => 重要なお知らせ
       * * 173 => ここにタグを設置できます
       * * 174 => MalaysiaOffice
       * * 175 => 近況
       * * 176 => 近所のお店
       * * 177 => #テスト
       * * 178 => テスト投稿1
       * * 179 => aaa
       * * 180 => 飯田橋リニューアル!
       * * 181 => ttt
       * * 182 => #CCS事例紹介 #ミルトス
       * * 183 => CCS事例紹介
       * * 184 => #ミルトス
       * * 185 => パジャ・ポス
       * * 186 => new tag1
       * * 187 => 花束
       * * 188 => Gaandu
       * * 189 => #長濱ねる
       * * 190 => testtest
       */
      tag_id?: Array<
        | 75
        | 76
        | 67
        | 68
        | 69
        | 70
        | 71
        | 72
        | 73
        | 74
        | 162
        | 163
        | 164
        | 166
        | 171
        | 173
        | 174
        | 175
        | 176
        | 177
        | 178
        | 179
        | 180
        | 181
        | 182
        | 183
        | 184
        | 185
        | 186
        | 187
        | 188
        | 189
        | 190
      >;
      /**
       * GCSファイル
       */
      ext_col_04?: Array<{
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * Description
         */
        desc?: string;
        /**
         * File ID. Whether the item should be updated or inserted depends on this ID being set or not.
         */
        id?: string;
      }>;
      /**
       * 動画
       */
      ext_col_06?: {
        /**
         * File ID returned by File Upload API
         */
        file_id?: string;
        /**
         * Description
         */
        desc?: string;
      };
      /**
       * コメント
       */
      ext_col_02?: string;
      /**
       * Validate
       */
      validate_only?: boolean;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postContentServiceRcmsApi1TestResponse = any;
}
