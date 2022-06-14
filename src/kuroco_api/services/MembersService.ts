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
   * @param outputFormat Format (json|xml|csv|zip)
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
   * @param outputFormat Format (json|xml|csv|zip)
   * @param lang Language
   * @param charset Charset
   * @param id Member ID
   * @param cnt Number of topics per page
   * @param pageId Page ID
   * @param groupId Member search
   * @param filter Filter query
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
          'group_id[]': requestParam.groupId,
          filter: requestParam.filter,
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
   * @param outputFormat Format (json|xml|csv|zip)
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
    groupId?: Array<number>;
    filter?: string;
  }
  export type getMembersServiceRcmsApi1MembersResponse = any;
  export interface postMembersServiceRcmsApi1MemberUpdateRequest {
    requestBody: {
      /**
       * /label/current_password
       */
      current_password?: string;
      /**
       * name1
       */
      name1?: string;
      /**
       * name2
       */
      name2?: string;
      /**
       * nickname
       */
      nickname?: string;
      /**
       * zip_code
       */
      zip_code?: string;
      /**
       * tdfk_cd
       */
      tdfk_cd?:
        | '01'
        | '02'
        | '03'
        | '04'
        | '05'
        | '06'
        | '07'
        | '08'
        | '09'
        | '10'
        | '11'
        | '12'
        | '13'
        | '14'
        | '15'
        | '16'
        | '17'
        | '18'
        | '19'
        | '20'
        | '21'
        | '22'
        | '23'
        | '24'
        | '25'
        | '26'
        | '27'
        | '28'
        | '29'
        | '30'
        | '31'
        | '32'
        | '33'
        | '34'
        | '35'
        | '36'
        | '37'
        | '38'
        | '39'
        | '40'
        | '41'
        | '42'
        | '43'
        | '44'
        | '45'
        | '46'
        | '47'
        | '99';
      /**
       * address1
       */
      address1?: string;
      /**
       * address2
       */
      address2?: string;
      /**
       * address3
       */
      address3?: string;
      /**
       * tel
       */
      tel?: string;
      /**
       * email_send_ng_flg
       */
      email_send_ng_flg?: 0 | 1;
      /**
       * tel_send_ng_flg
       */
      tel_send_ng_flg?: 0 | 1;
      /**
       * login_pwd
       */
      login_pwd?: string;
      /**
       * login_id
       */
      login_id?: string;
      /**
       * image
       */
      image?: {
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
       * /label/group_id
       */
      group_id?: Array<1 | 2 | 101 | 102>;
      /**
       * /label/login_ok_flg
       */
      login_ok_flg?: 0 | 1;
      /**
       * Validate
       */
      validate_only?: boolean;
      auto_login?: number;
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
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postMembersServiceRcmsApi1MemberUpdateResponse = any;
}
