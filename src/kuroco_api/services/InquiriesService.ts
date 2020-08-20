/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { ApiError, catchGenericError } from '../core/ApiError';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { LocalStorage } from '../core/LocalStorage';
import { Result } from '../core/Result';

export class InquiriesService {
  /**
   *
   * ### **InquiryMessage::send (v1)**
   *
   *
   * ## Controller parameters
   *
   * > **id** `5`
   *
   * @param requestBody
   * @param outputFormat Format (json|xml|csv)
   * @param lang Language
   * @param charset Charset
   * @result any
   * @throws ApiError
   */
  public static async postInquiriesServiceRcmsApi1Report(
    requestParam: InquiriesService.postInquiriesServiceRcmsApi1ReportRequest,
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
        path: `/rcms-api/1/report`,
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

export namespace InquiriesService {
  export interface postInquiriesServiceRcmsApi1ReportRequest {
    requestBody: {
      /**
       * With ID
       */
      from_id?: number;
      /**
       * From module
       */
      from_module?: string;
      /**
       * Name
       */
      name?: string;
      /**
       * E-mail
       */
      from_mail?: string;
      /**
       * Message
       */
      body: string;
      /**
       * Validate
       */
      validate_only?: boolean;
    };
    outputFormat?: string;
    lang?: string;
    charset?: string;
  }
  export type postInquiriesServiceRcmsApi1ReportResponse = any;
}
