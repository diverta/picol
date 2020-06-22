export class CONSTANTS {
  public static readonly UPLOADABLE_FILETYPE_DEF: {
    [fn: string]: CONSTANTS.FileTypeDef;
  } = {
    GIF: { isMovie: false, exts: ['gif'], type: 'image/gif' },
    JPEG: { isMovie: false, exts: ['jpg', 'jpeg'], type: 'image/jpeg' },
    PNG: { isMovie: false, exts: ['png'], type: 'image/png' },
    Flash: { isMovie: true, exts: ['swf'], type: 'application/x-shockwave-flash' },
    MPEG: { isMovie: true, exts: ['mpg', 'mpeg'], type: 'video/mpeg' },
    MP4: { isMovie: true, exts: ['mp4'], type: 'video/mp4' },
    WebM: { isMovie: true, exts: ['webm'], type: 'video/webm' },
    Ogg: { isMovie: true, exts: ['ogv'], type: 'video/ogg' },
    QuickTime: { isMovie: true, exts: ['mov', 'qt'], type: 'video/quicktime' },
    AVI: { isMovie: true, exts: ['avi'], type: 'video/x-msvideo' },
  };

  public static readonly UPLOADABLE_FILETYPE_DEF_ARR = Object.values(CONSTANTS.UPLOADABLE_FILETYPE_DEF);

  public static readonly APP_ERROR = {
    NO_DATA: new Error('NO_DATA'),
  };

  public static readonly UNKNOWN_IMAGE_PATH = `/assets/images/dummy_image.svg`;
  public static readonly UNKNOWN_USER_IMAGE_PATH = `/assets/images/dummy_icon_mypage.png`;
}

export namespace CONSTANTS {
  export interface FileTypeDef {
    isMovie: boolean;
    exts: string[];
    type: string;
  }
}
