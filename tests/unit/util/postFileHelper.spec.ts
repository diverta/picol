import { PostFileHelper } from '@/util/postFileHelper';
import { FeedModel } from '@/type';

let helper!: PostFileHelper;

jest.mock('@/kuroco_api/core/Uploader', () => ({
  UploaderFactory: {
    create: () => ({
      upload: jest.fn().mockReturnValue(Promise.resolve({ url: 'DUMMY_URL', file_id: 'file_id' })),
    }),
  },
}));

global.URL.createObjectURL = jest.fn().mockReturnValue('DUMMY_URL');

const stabData: {
  image: FeedModel.MediaFromFeed;
  video: FeedModel.MediaFromFeed;
  file: any;
} = {
  image: {
    type: 'image' as 'image',
    file_id: 'file_id',
    desc: 'file_nm',
    url: 'url',
    id: 'id',
  },
  video: {
    type: 'video' as 'video',
    file_id: 'file_id',
    desc: 'file_nm',
    url: 'url',
    id: 'id',
  },
  file: { name: 'file_nm' } as any,
};

describe('postFileHelper', () => {
  beforeEach(() => {
    helper = new PostFileHelper();
    helper.init([]);
  });
  it('shouuld create instance properly', () => {
    expect(helper).not.toBeUndefined();
  });
  describe('render sources for view', () => {
    it('should render 5 length array when it should render image', () => {
      helper.mediaType = 'image';
      expect(helper.renderSource.length).toBe(5);
    });
    it('should render 1 length array when it should render video', () => {
      helper.mediaType = 'video';
      expect(helper.renderSource.length).toBe(1);
    });
  });
  describe('init()', () => {
    it('shouuld handle to set mediaType properly', async () => {
      await helper.init([]);
      expect(helper.mediaType).toBe('image');

      await helper.init([stabData.video]);
      expect(helper.mediaType).toBe('video');

      await helper.init([stabData.image]);
      expect(helper.mediaType).toBe('image');

      await helper.init([stabData.image, stabData.video]);
      expect(helper.mediaType).toBe('video');
    });
  });
  describe('set source', () => {
    it('should handle to set _source by each media type', () => {
      helper.source = [stabData.image, stabData.image, stabData.video, stabData.image];
      expect(helper._source.image.length).toBe(3);
      expect(helper._originalSource.image.length).toBe(3);
      expect(helper._source.video.length).toBe(1);
      expect(helper._originalSource.video.length).toBe(1);
    });
  });

  describe('adopt()', () => {
    it('should change mediaType by file type of each values', async () => {
      await helper.adopt(stabData.file, 'image', 0);
      expect(helper.mediaType).toBe('image');
      await helper.adopt(stabData.file, 'video', 1);
      expect(helper.mediaType).toBe('video');
      await helper.adopt(stabData.file, 'image', 4);
      expect(helper.mediaType).toBe('image');
    });
    it('should add values sequentially if the images are all image type file', async () => {
      await helper.adopt(stabData.file, 'image', 0);
      await helper.adopt(stabData.file, 'image', 1);
      await helper.adopt(stabData.file, 'image', 4);
      expect(helper._source.image.length).toBe(5);
      expect(helper._source.video.length).toBe(0);
      expect(!!helper._source.image[0]).toBeTruthy();
      expect(!!helper._source.image[1]).toBeTruthy();
      expect(!!helper._source.image[2]).not.toBeTruthy();
      expect(!!helper._source.image[3]).not.toBeTruthy();
      expect(!!helper._source.image[4]).toBeTruthy();
      expect(!!helper._source.video[0]).not.toBeTruthy();
    });
    it('should add values properly if the type of values are changed', async () => {
      await helper.adopt(stabData.file, 'image', 0);
      await helper.adopt(stabData.file, 'video');
      await helper.adopt(stabData.file, 'image', 4);
      expect(helper._source.image.length).toBe(5);
      expect(helper._source.video.length).toBe(1);
      expect(!!helper._source.image[0]).toBeTruthy();
      expect(!!helper._source.image[1]).not.toBeTruthy();
      expect(!!helper._source.image[2]).not.toBeTruthy();
      expect(!!helper._source.image[3]).not.toBeTruthy();
      expect(!!helper._source.image[4]).toBeTruthy();
      expect(!!helper._source.video[0]).toBeTruthy();
    });
  });

  describe('should return proper data for posting to API', () => {
    const expectInsert = (data: any) => {
      expect(data).toMatchObject({ file_id: 'file_id', desc: 'file_nm' });
    };
    const expectUpdate = (data: any) => {
      expect(data).toMatchObject({ id: 'id', file_id: 'file_id', desc: 'file_nm' });
    };
    const expectDelete = (data: any) => {
      expect(data).toMatchObject({});
    };

    it('should return empty datas when the data is empty', async () => {
      helper.init([]);
      const { image, video } = helper.preparedDataToRequest;
      expect(image.length).toBe(0);
      expect(video).toBeUndefined();
    });
    it('should return for update/insert/delete image data when the data is edited', async () => {
      helper.init([stabData.image, stabData.image]);
      helper.remove(0);
      await helper.adopt(stabData.file, 'image', 2);

      const { video, image } = helper.preparedDataToRequest;
      expect(helper.mediaType).toBe('image');
      expectDelete(image[0]);
      expectUpdate(image[1]);
      expectInsert(image[2]);
      expect(video).toBeUndefined();
    });
    it('should return for insert video data when the video is adopted', async () => {
      helper.init([stabData.image]);
      await helper.adopt(stabData.file, 'video', 0);

      expect(helper.mediaType).toBe('video');
      const { image, video } = helper.preparedDataToRequest;
      expectDelete(image[0]);
      expectInsert(video);
    });
    it('should return for delete video data when images adopted', async () => {
      helper.init([stabData.video]);
      await helper.adopt(stabData.file, 'image', 2);

      const { video, image } = helper.preparedDataToRequest;
      expect(helper.mediaType).toBe('image');
      expectInsert(image[0]);
      expectDelete(video);
    });
    it('should return for delete image data when videos adopted', async () => {
      helper.init([stabData.image, stabData.image]);
      await helper.adopt(stabData.file, 'video');
      const { video, image } = helper.preparedDataToRequest;
      expect(helper.mediaType).toBe('video');
      expectDelete(image[0]);
      expectDelete(image[1]);
      expectInsert(video);
    });
  });
});
