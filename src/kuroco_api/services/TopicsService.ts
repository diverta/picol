/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class TopicsService {
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
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
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1Feeds(
    requestParam: TopicsService.getTopicsServiceRcmsApi1FeedsRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postTopicsServiceRcmsApi1FeedCreate(
    requestParam: TopicsService.postTopicsServiceRcmsApi1FeedCreateRequest,
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
   * @param topicsId
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postTopicsServiceRcmsApi1FeedDeleteTopicsId(
    requestParam: TopicsService.postTopicsServiceRcmsApi1FeedDeleteTopicsIdRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postTopicsServiceRcmsApi1FeedUpdateTopicsId(
    requestParam: TopicsService.postTopicsServiceRcmsApi1FeedUpdateTopicsIdRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1Tg(
    requestParam: TopicsService.getTopicsServiceRcmsApi1TgRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1FeedGroup(
    requestParam: TopicsService.getTopicsServiceRcmsApi1FeedGroupRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
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
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1Infos(
    requestParam: TopicsService.getTopicsServiceRcmsApi1InfosRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
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
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1PreInfo(
    requestParam: TopicsService.getTopicsServiceRcmsApi1PreInfoRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1Preview(
    requestParam: TopicsService.getTopicsServiceRcmsApi1PreviewRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @param cnt Number of topics per page
   * @param pageId Page ID
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
   * @result any
   * @throws ApiError
   */
  public static async getTopicsServiceRcmsApi1Test(
    requestParam: TopicsService.getTopicsServiceRcmsApi1TestRequest,
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
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postTopicsServiceRcmsApi1Test(
    requestParam: TopicsService.postTopicsServiceRcmsApi1TestRequest,
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

export namespace TopicsService {
  export interface getTopicsServiceRcmsApi1FeedsRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
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
  }
  export type getTopicsServiceRcmsApi1FeedsResponse = any;
  export interface postTopicsServiceRcmsApi1FeedCreateRequest {
    requestBody: {
      /**
       * Topic title
       */
      subject: string;
      /**
       * Category ID
       * * 1 => フィード
       */
      contents_type?: 1;
      /**
       * Date
       */
      ymd?: string;
      /**
       * Published / Not published
       */
      open_type?: 'open' | 'close' | 'default';
      /**
       * Display all topics to logged in members, regardless ther public/hidden status
       */
      topics_flg?: 0 | 1;
      /**
       * Season
       */
      season?: number;
      /**
       * Contents
       */
      contents?: string;
      /**
       * display up
       */
      regular_flg?: number;
      /**
       * Display method
       */
      link_flg?: number;
      /**
       * Link
       */
      link_url?: string;
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
         * File name
         */
        file_nm?: string;
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
         * File name
         */
        file_nm?: string;
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
  export type postTopicsServiceRcmsApi1FeedCreateResponse = any;
  export interface postTopicsServiceRcmsApi1FeedDeleteTopicsIdRequest {
    topicsId: number;
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postTopicsServiceRcmsApi1FeedDeleteTopicsIdResponse = any;
  export interface postTopicsServiceRcmsApi1FeedUpdateTopicsIdRequest {
    topicsId: number;
    requestBody: {
      /**
       * Topic title
       */
      subject?: string;
      /**
       * Category ID
       * * 1 => フィード
       */
      contents_type?: 1;
      /**
       * Date
       */
      ymd?: string;
      /**
       * Published / Not published
       */
      open_type?: 'open' | 'close' | 'default';
      /**
       * Display all topics to logged in members, regardless ther public/hidden status
       */
      topics_flg?: 0 | 1;
      /**
       * Season
       */
      season?: number;
      /**
       * Contents
       */
      contents?: string;
      /**
       * display up
       */
      regular_flg?: number;
      /**
       * Display method
       */
      link_flg?: number;
      /**
       * Link
       */
      link_url?: string;
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
         * File name
         */
        file_nm?: string;
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
         * File name
         */
        file_nm?: string;
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
  export type postTopicsServiceRcmsApi1FeedUpdateTopicsIdResponse = any;
  export interface getTopicsServiceRcmsApi1TgRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getTopicsServiceRcmsApi1TgResponse = any;
  export interface getTopicsServiceRcmsApi1FeedGroupRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getTopicsServiceRcmsApi1FeedGroupResponse = any;
  export interface getTopicsServiceRcmsApi1InfosRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
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
  }
  export type getTopicsServiceRcmsApi1InfosResponse = any;
  export interface getTopicsServiceRcmsApi1PreInfoRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
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
  }
  export type getTopicsServiceRcmsApi1PreInfoResponse = any;
  export interface getTopicsServiceRcmsApi1PreviewRequest {
    previewToken: string;
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type getTopicsServiceRcmsApi1PreviewResponse = any;
  export interface getTopicsServiceRcmsApi1TestRequest {
    outputFormat?: string;
    lang?: string;
    charset?: string;
    cnt?: number;
    pageId?: number;
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
  }
  export type getTopicsServiceRcmsApi1TestResponse = any;
  export interface postTopicsServiceRcmsApi1TestRequest {
    requestBody: {
      /**
       * Topic title
       */
      subject: string;
      /**
       * Category ID
       * * 1 => フィード
       */
      contents_type?: 1;
      /**
       * Date
       */
      ymd?: string;
      /**
       * Published / Not published
       */
      open_type?: 'open' | 'close' | 'default';
      /**
       * Display all topics to logged in members, regardless ther public/hidden status
       */
      topics_flg?: 0 | 1;
      /**
       * Season
       */
      season?: number;
      /**
       * Contents
       */
      contents?: string;
      /**
       * display up
       */
      regular_flg?: number;
      /**
       * Display method
       */
      link_flg?: number;
      /**
       * Link
       */
      link_url?: string;
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
         * File name
         */
        file_nm?: string;
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
         * File name
         */
        file_nm?: string;
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
  export type postTopicsServiceRcmsApi1TestResponse = any;
}
