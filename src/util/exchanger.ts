import { FeedModel, CommentModel } from '@/type';
import dayjs from 'dayjs';
import { util } from '@/util/util';

/** utils of type exhange, intermidiate processes */

export function getMemberIDsFromComments(comments: CommentModel.Read.Response.RootObject[] = []) {
  return Array.from(
    new Set(
      comments
        .map((f) => f.list)
        .flat()
        .map((l) => l.member_id),
    ),
  );
}

export function getSortedComments(comments: CommentModel.Read.Response.RootObject[] = []) {
  const getUnix = (updateDate: string) => {
    const d = dayjs(updateDate.replace(/\.\d+/g, '')); // Safari can't parse milli seconds.
    return d.unix();
  };
  return comments
    .map((v) => v.list)
    .flat()
    .sort((a, b) => getUnix(b.update_date) - getUnix(a.update_date));
}

export function getMediasFromFeedData(feed: FeedModel.Read.Response.Feed): FeedModel.MediaFromFeed[] {
  const extCol04 = [...(feed.ext_col_04 || []).map((v) => ({ ...v, type: 'image' as 'image' }))];
  const extCol06 = feed.ext_col_06 ? [{ ...feed.ext_col_06, type: 'video' as 'video' }] : [];
  const files = [...extCol04, ...extCol06];

  const convert = (file: typeof files[0]) => {
    const { urlTillEndpoint, fileName } = util.File.getFileNames(file.url);
    return {
      type: file.type,
      file_id: urlTillEndpoint,
      file_nm: fileName,
      url: file.url,
      id: ((file as any).id as string) || undefined,
    };
  };

  return files.map((file) => convert(file));
}
