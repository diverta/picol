export namespace FavoriteMyListModel {
  export namespace Read {
    export namespace Response {
      export interface PageInfo {
        endPageNo: number;
        firstIndex: number;
        first_page_param: string;
        lastIndex: number;
        last_page_param: string;
        next_page_param: string;
        other_page_param: string;
        pageNo: number;
        param: string;
        path: string;
        perPage: string;
        previous_page_param: string;
        startPageNo: number;
        totalCnt: number;
        totalPageCnt: number;
      }

      export interface MyList {
        admin_nm: string;
        delete_ymdhi: null | string;
        dflg: number;
        favorite_id: number;
        inst_ymdhi: string;
        member_id: number;
        module_id: number;
        module_type: string;
        page_sysnm: string;
        rcmsid: null | number;
        update_ymdhi: string;
      }

      export interface RootObject {
        pageInfo: PageInfo;
        list: MyList[];
      }
    }
  }
}
