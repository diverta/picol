import { ActivityService } from '@/kuroco_api/services/ActivityService';
import { FavoritesService } from '@/kuroco_api/services/FavoritesService';
import { ContentService } from '@/kuroco_api/services/ContentService';
import { TagStateModule, UserStateModule } from '@/store';
import store from '@/store/store';
import { CommentModel, FeedModel } from '@/type/api';
import { ServiceHelper } from '@/util';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

export interface IFeedState extends FeedModel.Read.Response.RootObject {
  pageInfo: any;
  list: FeedModel.Read.Response.Feed[];
  comments: CommentModel.Read.Response.List[];
}

@Module({ dynamic: true, store, name: 'feed', namespaced: true })
class Feed extends VuexModule implements IFeedState {
  apis = {
    topics: ContentService,
    favorites: FavoritesService,
    comments: ActivityService,
  };

  pageInfo: any = {};
  list: FeedModel.Read.Response.Feed[] = [];
  comments: CommentModel.Read.Response.List[] = [];

  get all() {
    return { pageInfo: this.pageInfo, list: this.list, comments: this.comments };
  }

  /**
   * load topics on one page with storing data.
   * needs to be dispatched by Feed screen with normal requesting.
   * @param payload
   */
  @Action({ rawError: true })
  async loadPageAndStore(payload: ContentService.getContentServiceRcmsApi1FeedsRequest) {
    const page = await this.loadPage(payload);
    this.UPDATE_FEEDS(page.feed.list);
    this.UPDATE_PAGE_INFO(page.feed.pageInfo);
    this.UPDATE_COMMENTS(page.comments.map((d) => d.list).flat());
    return page;
  }

  /**
   * load topics on one page which don't need to store.
   * @param payload
   */
  @Action({ rawError: true })
  async loadPage(payload: ContentService.getContentServiceRcmsApi1FeedsRequest) {
    const { feed, tags, comments, member } = await ServiceHelper.Feed.LoadPage(payload);
    TagStateModule.addTags(tags);
    if (member) {
      UserStateModule.addMembers((member as any).list);
    }
    return {
      feed,
      tags,
      comments,
      member,
    };
  }

  /**
   * load topics on multiple pages which don't need to store.
   * @param payload
   */
  @Action({ rawError: true })
  async loadActivity(payload: ContentService.getContentServiceRcmsApi1FeedsRequest[]) {
    const { feeds, tags, comments, member } = await ServiceHelper.Feed.LoadActivity(payload);

    TagStateModule.addTags(tags);
    if (member) {
      UserStateModule.addMembers((member as any).list);
    }
    return {
      feeds,
      tags,
      comments,
      member,
    };
  }

  @Action({ rawError: true })
  async createFeed(payload: ContentService.postContentServiceRcmsApi1FeedCreateRequest) {
    await this.apis.topics.postContentServiceRcmsApi1FeedCreate(payload);
  }

  @Action({ rawError: true })
  async updateFeed(payload: ContentService.postContentServiceRcmsApi1FeedUpdateTopicsIdRequest) {
    await this.apis.topics.postContentServiceRcmsApi1FeedUpdateTopicsId(payload);
  }

  @Action({ rawError: true })
  async removeFeed(query: ContentService.postContentServiceRcmsApi1FeedDeleteTopicsIdRequest) {
    await this.apis.topics.postContentServiceRcmsApi1FeedDeleteTopicsId(query);
    this.DELETE_FEED({ topics_id: query.topicsId });
  }

  @Action({ rawError: true })
  clear() {
    this.CLEAR();
  }

  @Action({ rawError: true })
  async setFavorite(payload: FavoritesService.postFavoritesServiceRcmsApi1FavoriteCreateRequest) {
    await this.apis.favorites.postFavoritesServiceRcmsApi1FavoriteCreate(payload);
    this.UPDATE_FEED_FAV({ topicsID: payload.requestBody.module_id, newFav: true });
  }

  @Action({ rawError: true })
  async removeFavorite(payload: FavoritesService.postFavoritesServiceRcmsApi1FavoriteDeleteRequest) {
    await this.apis.favorites.postFavoritesServiceRcmsApi1FavoriteDelete(payload);
    this.UPDATE_FEED_FAV({ topicsID: payload.requestBody.module_id, newFav: false });
  }

  @Action({ rawError: true })
  async createComment(payload: ActivityService.postActivityServiceRcmsApi1CommentCreateRequest) {
    await ServiceHelper.apis.comments.postActivityServiceRcmsApi1CommentCreate(payload);
    const comments = (
      await this.apis.comments.getActivityServiceRcmsApi1Comments({
        moduleId: [payload.requestBody.module_id],
      })
    ).body as CommentModel.Read.Response.RootObject[];

    this.UPDATE_COMMENTS(comments.map((c) => c.list).flat());
    this.UPDATE_COMMENTS_COUNT({ topicsID: payload.requestBody.module_id, upOrDown: +1 });
  }

  @Action({ rawError: true })
  async removeComment(payload: ExtendedPostActivityServiceRcmsApi1CommentDeleteRequest) {
    await this.apis.comments.postActivityServiceRcmsApi1CommentDeleteCommentId(payload.body);
    this.DELETE_COMMENT(payload.body.commentId);
    this.UPDATE_COMMENTS_COUNT({ topicsID: payload.topicsID, upOrDown: -1 });
  }

  @Mutation
  private UPDATE_FEEDS(topicsList: FeedModel.Read.Response.Feed[]) {
    this.list.pushAll(topicsList);
  }

  @Mutation
  private DELETE_FEED({ topics_id }: { topics_id: number }) {
    const idx = this.list.findIndex((feed) => feed.topics_id === topics_id);
    if (idx === -1) {
      return;
    }
    this.list.splice(idx, 1);
  }

  @Mutation
  private CLEAR() {
    Object.keys(this.pageInfo).forEach((k) => delete this.pageInfo[k]);
    this.list.clear();
    this.comments.clear();
  }

  @Mutation
  private UPDATE_FEED_FAV({ topicsID, newFav }: { topicsID: number; newFav: boolean }) {
    if (this.list.length === 0) {
      return;
    }
    const storedFeed = Object.values(this.list).find((f) => f.topics_id === topicsID) as FeedModel.Read.Response.Feed;
    storedFeed.favorite_cnt += newFav ? 1 : -1;
    storedFeed.my_favorite_flg = newFav;
  }

  @Mutation
  private UPDATE_PAGE_INFO(pageInfo: FeedModel.Read.Response.PageInfo) {
    this.pageInfo = {
      ...this.pageInfo,
      ...pageInfo,
    };
  }

  @Mutation
  private UPDATE_COMMENTS_COUNT({ topicsID, upOrDown }: { topicsID: number; upOrDown: 1 | -1 }) {
    if (this.list.length === 0) {
      return;
    }
    const target = this.list.find((l) => l.topics_id === topicsID) as FeedModel.Read.Response.Feed;
    target.comment_cnt += upOrDown;
  }

  @Mutation
  private UPDATE_COMMENTS(comments: CommentModel.Read.Response.List[] = []) {
    comments.forEach((c) => {
      const idx = this.comments.findIndex((comment) => comment.comment_id === c.comment_id);
      idx === -1 ? this.comments.push(c) : (this.comments[idx] = { ...this.comments[idx], ...c });
    });
  }

  @Mutation DELETE_COMMENT(commentID: number) {
    const idx = this.comments.findIndex((c) => c.comment_id === commentID);
    if (idx === -1) {
      return;
    }
    this.comments.splice(idx, 1);
  }
}

export const FeedStateModule = getModule(Feed);

interface ExtendedPostActivityServiceRcmsApi1CommentDeleteRequest {
  body: ActivityService.postActivityServiceRcmsApi1CommentDeleteCommentIdRequest;
  topicsID: number;
}
