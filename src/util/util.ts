/* tslint:disable */
/* eslint-disable */

import { isNull, isString, isEmpty } from 'lodash';
import distanceInWords from 'date-fns/distance_in_words';
import parse from 'date-fns/parse';
import ja from 'date-fns/locale/ja';
import { camelCase } from 'change-case';
import { FeedModel } from '@/type';
import { CONSTANTS } from '@/core';

export namespace util {
  /**
   * return true if arg is not null & not undefined.
   * @param arg checkTarget
   */
  export function exists(arg: any) {
    return arg !== undefined && arg !== null;
  }

  /**
   * password complexity checker for Vuelidate.
   * @ref https://github.com/vuelidate/vuelidate/issues/193#issuecomment-367918602
   */
  export function checksPasswordComplexity(password: string): boolean {
    // probably already handled by the required flag
    if (isNull(password) || !isString(password) || isEmpty(password)) {
      return false;
    }

    // Minimum of 1 Uppercase Letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Minimum of 1 Number
    if (!/\d/.test(password)) {
      return false;
    }

    // Except Invalid chars
    if (!/^([a-zA-Z0-9\-_]{6,})$/.test(password)) {
      return false;
    }

    return true;
  }

  export function getHowLongBeforePostedData(ymd_str: string) {
    try {
      return distanceInWords(new Date(), parse(ymd_str), {
        addSuffix: true,
        locale: navigator.language == 'ja' ? 'ja' : 'en',
      });
    } catch (e) {
      return '-';
    }
  }

  /**
   * get CSS transform value to rotate image includes EXIF orientation value.
   * @example ```
   * applyRotationStyleByEXIF(imgUrl: string, idx: number) {
   *   fetch(imgUrl)
   *     .then((res) => res.blob())
   *     .then((blob) => {
   *       const file = new File([blob], 'dummy.png', blob);
   *       util.getOrientation(
   *         file,
   *         (orientationValue: number) =>
   *           (this.rotationImageStyleValues[idx].transform = util.getTransformValueByExifOrientationInfo(
   *             orientationValue,
   *           )),
   *       );
   *     });
   * }
   * ```
   * @see getOrientation
   * @param orientationValue
   */
  export function getTransformValueByExifOrientationInfo(orientationValue: number) {
    const ORIENT_TRANSFORMS: { [num: number]: string } = {
      1: 'none',
      2: 'rotateY(180deg)',
      3: 'rotate(180deg)',
      4: 'rotate(180deg) rotateY(180deg)',
      5: 'rotate(270deg) rotateY(180deg)',
      6: 'rotate(90deg)',
      7: 'rotate(90deg) rotateY(180deg)',
      8: 'rotate(270deg)',
    };
    return ORIENT_TRANSFORMS[orientationValue];
  }

  /**
   * get orientation value from EXIF info inside of JPEG and TIFF.
   * @see https://stackoverflow.com/a/32490603
   * @param file
   * @param callback
   */
  export function getOrientation(file: File, callback: Function) {
    var reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      if (!event.target) {
        return;
      }

      const file = event.target as FileReader;
      const view = new DataView(file.result as ArrayBuffer);

      if (view.getUint16(0, false) != 0xffd8) {
        return callback(-2);
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
        let marker = view.getUint16(offset, false);
        offset += 2;

        if (marker == 0xffe1) {
          if (view.getUint32((offset += 2), false) != 0x45786966) {
            return callback(-1);
          }

          let little = view.getUint16((offset += 6), false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          let tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) == 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little));
            }
          }
        } else if ((marker & 0xff00) != 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };

    reader.readAsArrayBuffer(file);
  }

  export namespace File {
    /** returnes file's extension as lower case string. */
    export function getExt(url: string) {
      const rawExt = url.split(/\./g).pop() || '';
      return rawExt.toLowerCase();
    }

    export function isProperFile(arg: { mediaFromFeed?: FeedModel.MediaFromFeed; file?: File }) {
      let ext!: string;
      const { mediaFromFeed, file } = arg;

      if (mediaFromFeed === undefined && file === undefined) {
        throw Error('invalid argument');
      }
      if (mediaFromFeed !== undefined) {
        ext = getExt(mediaFromFeed.url);
      }
      if (file !== undefined) {
        ext = getExt(file.name);
      }

      const idx = CONSTANTS.UPLOADABLE_FILETYPE_DEF_ARR.findIndex((uploadableDef) =>
        uploadableDef.exts.some((extStr) => new RegExp(`^${extStr}$`).test(ext)),
      );
      return idx !== -1;
    }

    export function getFileType(fileName: string) {
      const ext = getExt(fileName);
      const fileTypeDef = getFileTypeDef(ext);
      return fileTypeDef.isMovie ? 'video' : 'image';
    }

    /** return file name and URL (including with it's extension) */
    export function getFileNames(url: string) {
      const urlTillEndpoint = url.split(/\?/g)[0];
      const fileName = urlTillEndpoint.split(/\//g).pop() || '';
      return {
        urlTillEndpoint,
        fileName,
      };
    }

    function getFileTypeDef(ext: string = '') {
      const idx = CONSTANTS.UPLOADABLE_FILETYPE_DEF_ARR.findIndex((uploadableDef) =>
        uploadableDef.exts.some((extStr) => new RegExp(`^${extStr.toLowerCase()}$`).test(ext.toLowerCase())),
      );
      if (idx === -1) {
        throw Error('invalid file ext.');
      }
      return CONSTANTS.UPLOADABLE_FILETYPE_DEF_ARR[idx];
    }
  }
}
