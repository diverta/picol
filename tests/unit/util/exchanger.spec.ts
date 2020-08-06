import { getMediasFromFeedData } from '@/util/exchanger';
import { FeedModel } from '@/type';

jest.mock('@/util/util', () => ({
  util: {
    File: {
      getFileNames: (...args: any) => ({
        urlTillEndpoint: 'DUMMY_urlTillEndpoint',
        fileName: 'DUMMY_fileName',
      }),
    },
  },
}));

describe('getMediasFromFeedData()', () => {
  it('should return empty array if the target values are empty', () => {
    let data!: Partial<FeedModel.Read.Response.Feed>;
    let rtn!: FeedModel.MediaFromFeed[];

    data = {
      ext_col_04: [],
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 0).toBeTruthy();

    data = {
      ext_col_06: null,
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 0).toBeTruthy();
    data = {
      ext_col_06: undefined,
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 0).toBeTruthy();

    data = {
      ext_col_04: [],
      ext_col_06: null,
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 0).toBeTruthy();

    data = {
      ext_col_04: [],
      ext_col_06: {} as any,
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 0).toBeTruthy();

    data = {};
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 0).toBeTruthy();
  });

  it('should return image datas if the feed only has ext_col_04', () => {
    let data!: Partial<FeedModel.Read.Response.Feed>;
    let rtn!: FeedModel.MediaFromFeed[];

    data = {
      ext_col_04: [
        {
          id: 'id_1',
          url: 'https://www.test.png',
          desc: 'desc',
        },
      ],
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 1).toBeTruthy();
    expect(rtn[0]).toEqual(
      expect.objectContaining({
        type: 'image',
        url: 'https://www.test.png',
        id: 'id_1',
      }),
    );

    data = {
      ext_col_04: [
        {
          id: 'id_1',
          url: 'https://www.test1.png',
          desc: 'desc',
        },
        {
          id: 'id_2',
          url: 'https://www.test2.png',
          desc: 'desc',
        },
      ],
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 2).toBeTruthy();
    expect(rtn[0]).toEqual(
      expect.objectContaining({
        type: 'image',
        url: 'https://www.test1.png',
        id: 'id_1',
      }),
    );
    expect(rtn[1]).toEqual(
      expect.objectContaining({
        type: 'image',
        url: 'https://www.test2.png',
        id: 'id_2',
      }),
    );
  });

  it('should return video data if the feed only has ext_col_06', () => {
    let data!: Partial<FeedModel.Read.Response.Feed>;
    let rtn!: FeedModel.MediaFromFeed[];

    data = {
      ext_col_06: {
        url: 'https://www.test.mp4',
        value: 'desc',
      },
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 1).toBeTruthy();
    expect(rtn[0]).toEqual(
      expect.objectContaining({
        type: 'video',
        url: 'https://www.test.mp4',
        id: undefined,
      }),
    );
  });

  it('should return image/video datas if the feed has ext_col_04 and ext_col_06', () => {
    let data!: Partial<FeedModel.Read.Response.Feed>;
    let rtn!: FeedModel.MediaFromFeed[];

    data = {
      ext_col_04: [
        {
          id: 'id_1',
          url: 'https://www.test.png',
          desc: 'desc',
        },
      ],
      ext_col_06: {
        url: 'https://www.test.mp4',
        value: 'desc',
      },
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 2).toBeTruthy();
    expect(rtn[0]).toEqual(
      expect.objectContaining({
        type: 'image',
        url: 'https://www.test.png',
        id: 'id_1',
      }),
    );
    expect(rtn[1]).toEqual(
      expect.objectContaining({
        type: 'video',
        url: 'https://www.test.mp4',
        id: undefined,
      }),
    );

    data = {
      ext_col_04: [
        {
          id: 'id_1',
          url: 'https://www.test1.png',
          desc: 'desc',
        },
        {
          id: 'id_2',
          url: 'https://www.test2.png',
          desc: 'desc',
        },
      ],
      ext_col_06: {
        url: 'https://www.test.mp4',
        value: 'desc',
      },
    };
    rtn = getMediasFromFeedData(data as FeedModel.Read.Response.Feed);
    expect(rtn.length === 3).toBeTruthy();
    expect(rtn[0]).toEqual(
      expect.objectContaining({
        type: 'image',
        url: 'https://www.test1.png',
        id: 'id_1',
      }),
    );
    expect(rtn[1]).toEqual(
      expect.objectContaining({
        type: 'image',
        url: 'https://www.test2.png',
        id: 'id_2',
      }),
    );
    expect(rtn[2]).toEqual(
      expect.objectContaining({
        type: 'video',
        url: 'https://www.test.mp4',
        id: undefined,
      }),
    );
  });
});
