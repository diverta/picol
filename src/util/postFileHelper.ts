import { Uploader, UploaderFactory } from '@/kuroco_api/core/Uploader';
import { FeedModel } from '@/type';
import { Vue } from 'vue-property-decorator';

export class PostFileHelper {
  uploader!: Uploader;
  mediaType: 'image' | 'video' = 'image';
  _originalSource: PostFileHelper.Source = {
    video: [],
    image: [],
  };
  _source: PostFileHelper.Source = {
    video: [],
    image: [],
  };

  set source(d: FeedModel.MediaFromFeed[]) {
    d.map((v) => {
      switch (v.type) {
        case 'image':
          this._source.image.push(v);
          this._originalSource.image.push(v);
          break;
        case 'video':
          this._source.video.push(v);
          this._originalSource.video.push(v);
          break;
        default:
          const _never: never = v.type;
      }
    });
  }
  get renderSource() {
    switch (this.mediaType) {
      case 'image':
        return this._source.image.length < 5
          ? Array.from({ length: 5 }, (_, idx) => this._source.image[idx])
          : this._source.image;
      case 'video':
        return this._source.video.length < 1 ? [null] : this._source.video;
    }
  }
  get preparedDataToRequest() {
    const image = this.format2requestData('image', this.mediaType !== 'image');
    const video = this.format2requestData('video', this.mediaType !== 'video')[0];
    if (video) {
      delete (video as any).id;
    }

    return {
      image,
      video,
    };
  }

  public async init(mediasFromFeed: FeedModel.MediaFromFeed[] = []) {
    this.uploader = await UploaderFactory.create({});
    this.source = mediasFromFeed;
    this.mediaType = mediasFromFeed.some((d) => d.type === 'video') ? 'video' : 'image';
  }
  public confirmOnAdopt(mediaType: this['mediaType']) {
    if (this.mediaType === mediaType) {
      return true;
    }
    if (this.renderSource.every((d) => !d)) {
      return true;
    }

    return window.confirm(`
      画像/動画は同時に投稿できません。
      このファイルをアップロードする代わりに、
      アップロード済みの${this.mediaType === 'video' ? '動画' : '写真'}ファイルを削除してよろしいですか？
    `);
  }
  public async adoptVideo(file: File, mediaType: 'video') {
    await this.adopt(file, mediaType);
  }
  public async adoptImage(file: File, mediaType: 'image', idx: number = 0) {
    await this.adopt(file, mediaType, idx);
  }
  public async adopt(file: File, mediaType: this['mediaType'], idx: number = 0) {
    const { url, file_id } = await this.uploader.upload(file, idx);
    const source: PostFileHelper.FileData = {
      type: mediaType,
      file_id,
      desc: file.name,
      url,
    };
    Vue.set(this._source[mediaType], idx, source);
    this.mediaType = mediaType;
  }
  public remove(idx: number = 0) {
    this._source[this.mediaType].splice(idx, 1, null);
  }
  public format2requestData(mediaType: this['mediaType'], shouldNotRequest: boolean) {
    const src = this._source[mediaType];
    const orig = this._originalSource[mediaType];
    const length = Math.max(src.length, orig.length);
    if (length === 0) {
      return [];
    }

    return Array.from({ length }, (_, idx) => {
      if (shouldNotRequest) {
        return toDelete();
      }

      const source = src[idx];
      const original = orig[idx];
      if (source && original) {
        return toUpdate(original.id, source.file_id, source.desc);
      }
      if (source && !original) {
        return toInsert(source.file_id, source.desc);
      }
      if (!source && original) {
        return toDelete();
      }
      return 'IGNORE';
    }).filter((v) => v !== 'IGNORE');

    function toUpdate(id: string | undefined, file_id: string, desc: string) {
      return {
        id,
        file_id,
        desc,
      };
    }
    function toInsert(file_id: string, desc: string) {
      return {
        file_id,
        desc,
      };
    }
    function toDelete() {
      return {};
    }
  }
}

export namespace PostFileHelper {
  export interface Source {
    video: (PostFileHelper.FileData | null)[];
    image: (PostFileHelper.FileData | null)[];
  }
  export type FileData = FeedModel.MediaFromFeed & {
    file_id?: string;
  };
}
