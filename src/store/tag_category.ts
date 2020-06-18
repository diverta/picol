import { TagStateModule } from '@/store';
import store from '@/store/store';
import { TagCategoryModel, TagModel } from '@/type';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { TagsService } from '@/kuroco_api/services/TagsService';

export interface TagCategoryGroupedTagList {
  category_id: number;
  category_name: string;
  list: TagCategoryModel.Read.Response.List[];
}

export interface ITagCategoryState {
  tagDefs: TagCategoryModel.Read.Response.RootObject[];
}

@Module({ dynamic: true, store, name: 'tagCategory', namespaced: true })
class TagCategory extends VuexModule implements ITagCategoryState {
  apis = {
    tags: TagsService,
  };
  tagDefs: TagCategoryModel.Read.Response.RootObject[] = [];

  /**
   * returns sorted tag definitions as no category name tag def to the end of array.
   *
   * @readonly
   * @memberof TagCategory
   */
  get sortedTagDefs() {
    if (this.tagDefs.length === 0) {
      return [];
    }

    return [
      ...this.tagDefs.filter((tagDef) => tagDef.category_name !== ''),
      ...this.tagDefs.filter((tagDef) => tagDef.category_name === ''),
    ];
  }

  get getTags() {
    return (tagID: number) =>
      this.tagDefs
        .map((d) => d.list)
        .flat(1)
        .filter((v) => v.tag_id === tagID);
  }

  @Action({ rawError: true })
  async readAll() {
    const tags = (await this.apis.tags.getTagsServiceRcmsApi1TagsCategoryGrouped(
      {},
    )) as TagCategoryModel.Read.Response.RootObject[];
    this.UPDATE_ALL_TAG_DEFS(tags);
    return tags;
  }

  @Action({ rawError: true })
  addTagCategory(query: TagsService.postTagsServiceRcmsApi1TagCreateRequest) {
    return TagStateModule.addTag(query).then((d) => {
      if (d.errors.length > 0) {
        return Promise.reject(d) as any;
      }
      this.ADD_TAG({
        tag_nm: query.requestBody.tag_nm,
        tag_category_id: d.tag_category_id,
        tag_id: d.tag_id,
      });
    });
  }

  @Mutation
  private UPDATE_ALL_TAG_DEFS(res: TagCategoryModel.Read.Response.RootObject[]) {
    this.tagDefs.replaceAll(res);
  }

  @Mutation
  private ADD_TAG({ tag_nm, tag_category_id, tag_id }: ITag) {
    this.tagDefs
      .filter((td) => td.category_id === tag_category_id)
      .forEach((td) =>
        td.list.push({
          tag_id,
          tag_nm,
        } as any),
      );
  }
}

interface ITag extends Partial<TagModel.Create.Response.RootObject> {
  tag_nm: string;
}

export const TagCategoryStateModule = getModule(TagCategory);
