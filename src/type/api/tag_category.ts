import { TagModel } from '@/type/api/tag';

export namespace TagCategoryModel {
  export namespace Read {
    export namespace Response {
      export type List = TagModel.Read.Response.List;

      export interface RootObject {
        category_id: number;
        category_name: string;
        list: List[];
      }
    }
  }
}
