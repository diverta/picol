import store from '@/store/store';
import { TagModel } from '@/type/api';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { TagsService } from '@/kuroco_api/services/TagsService';

export interface ITagState {
  tagDefs: TagModel.Read.Response.RootObject[];
}

@Module({ dynamic: true, store, name: 'tag', namespaced: true })
class Tag extends VuexModule implements ITagState {
  apis = {
    tags: TagsService,
  };
  tagDefs: TagModel.Read.Response.RootObject[] = [];

  get allTags(): TagModel.Read.Response.List[] {
    return (this.tagDefs as any[]).filter((tag) => tag.module_id).flat(1);
  }

  get getTag() {
    return (moduleID: number) => {
      const tagDef = this.tagDefs.find((tagDef) => tagDef.module_id === moduleID);
      return tagDef !== undefined ? tagDef.list : [];
    };
  }

  @Action({ rawError: true })
  async fetchOnFeeds(request: TagsService.getTagsServiceRcmsApi1TagsRequest) {
    const tagDefs = (await this.apis.tags.getTagsServiceRcmsApi1Tags(request))
      .body as TagModel.Read.Response.RootObject[];
    this.ADD_TAG_DEFS(tagDefs);
    return tagDefs;
  }

  @Action({ rawError: true })
  async addTag(request: TagsService.postTagsServiceRcmsApi1TagCreateRequest) {
    return (await this.apis.tags.postTagsServiceRcmsApi1TagCreate(request)).body as TagModel.Create.Response.RootObject;
  }

  @Action({ rawError: true })
  addTags(payload: TagModel.Read.Response.RootObject[]) {
    this.ADD_TAG_DEFS(payload);
  }

  @Action({ rawError: true })
  clear() {
    this.CLEAR();
  }

  @Mutation
  private UPDATE_ALL_TAG_DEFS(tagDefs: TagModel.Read.Response.RootObject[]) {
    this.tagDefs.replaceAll(tagDefs);
  }

  @Mutation
  private ADD_TAG_DEFS(tagDefs: TagModel.Read.Response.RootObject[]) {
    this.tagDefs = [...this.tagDefs, ...tagDefs].filter((x, i, self) => self.indexOf(x) === i);
  }

  @Mutation
  private CLEAR() {
    this.tagDefs.clear();
  }
}

export const TagStateModule = getModule(Tag);
