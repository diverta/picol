import { CONSTANTS } from '@/core';
import { AccountModel, CommentModel, FeedModel, TagModel } from '@/type';
import dayjs from 'dayjs';
import { TopicsService } from '@/kuroco_api/services/TopicsService';
import { TagsService } from '@/kuroco_api/services/TagsService';
import { FavoritesService } from '@/kuroco_api/services/FavoritesService';
import { CommentsService } from '@/kuroco_api/services/CommentsService';
import { MembersService } from '@/kuroco_api/services/MembersService';

export namespace ServiceHelper {
  export const apis = {
    topics: TopicsService,
    tags: TagsService,
    favorites: FavoritesService,
    comments: CommentsService,
    members: MembersService,
  };

  export class Feed {
    public static async LoadPage(req: TopicsService.getTopicsServiceRcmsApi1FeedsRequest) {
      const feed = (await ServiceHelper.apis.topics.getTopicsServiceRcmsApi1Feeds({
        ...req,
      })) as FeedModel.Read.Response.RootObject;
      if (feed.list.length === 0) {
        return Promise.reject(CONSTANTS.APP_ERROR.NO_DATA);
      }

      const topicsIDs = feed.list.map((f) => f.topics_id).unique();

      const tags = feed.list
        .map((v) => ({ module_id: v.topics_id, list: v.tags }))
        .flat(1) as TagModel.Read.Response.RootObject[];

      const comments = (await ServiceHelper.apis.comments.getCommentsServiceRcmsApi1Comments({
        moduleId: topicsIDs,
      })) as CommentModel.Read.Response.RootObject[];

      const memberIDs = Feed.extractUniqueMemberIDs([feed], comments);

      let member: AccountModel.Read.Response.RootObject | undefined;
      if (memberIDs.length !== 0) {
        member = (await ServiceHelper.apis.members.getMembersServiceRcmsApi1Members({
          id: memberIDs,
        })) as AccountModel.Read.Response.RootObject;
      }

      return {
        feed,
        tags,
        comments,
        member,
      };
    }

    public static async LoadActivity(reqs: TopicsService.getTopicsServiceRcmsApi1FeedsRequest[]) {
      const feeds = await Promise.all([
        ...reqs.map(
          async (req) =>
            (await ServiceHelper.apis.topics.getTopicsServiceRcmsApi1Feeds({
              ...req,
            })) as FeedModel.Read.Response.RootObject,
        ),
      ]);

      if ([...feeds.map((f) => f.list)].flat().length === 0) {
        return Promise.reject(CONSTANTS.APP_ERROR.NO_DATA);
      }

      const topicsIDs = [...feeds.map((f) => f.list)]
        .flat()
        .map((f) => f.topics_id)
        .unique();

      const tags = (await ServiceHelper.apis.tags.getTagsServiceRcmsApi1Tags({
        moduleId: topicsIDs,
        moduleType: 'topics',
      })) as TagModel.Read.Response.RootObject[];

      // from 1month ago.
      const comments = (await ServiceHelper.apis.comments.getCommentsServiceRcmsApi1Comments({
        moduleId: topicsIDs,
        fromDate: dayjs()
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
      })) as CommentModel.Read.Response.RootObject[];

      const memberIDs = Feed.extractUniqueMemberIDs(feeds, comments);

      let member: AccountModel.Read.Response.RootObject | undefined;
      if (memberIDs.length !== 0) {
        member = (await ServiceHelper.apis.members.getMembersServiceRcmsApi1Members({
          id: memberIDs,
        })) as AccountModel.Read.Response.RootObject;
      }

      return {
        feeds,
        tags,
        comments,
        member,
      };
    }

    private static extractUniqueMemberIDs(
      feeds: FeedModel.Read.Response.RootObject[],
      comments: CommentModel.Read.Response.RootObject[],
    ): number[] {
      return [
        ...feeds
          .map((f) => f.list)
          .flat()
          .map((f) => f.member_id)
          .unique(),
        ...comments
          .map((f) => f.list)
          .flat()
          .map((l) => l.member_id)
          .unique(),
      ]
        .filter((d) => d && typeof d === 'number')
        .unique();
    }
  }
}
