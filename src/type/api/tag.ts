export namespace TagModel {
  export namespace Read {
    export namespace Response {
      export interface List {
        tag_id: number;
        tag_nm: string;
        open_contents_cnt: number;
        all_contents_cnt: number;
        open_flg: number;
        inst_ymdhi: string;
        update_ymdhi: string;
        tag_category_id: number;
        tag_comment?: any;
        ext_col_01: string;
        ext_col_02: string;
        ext_col_03: string;
        ext_col_04: string;
        ext_col_05: string;
        ext_col_06: string;
        ext_col_07: string;
        ext_col_08: string;
        ext_col_09: string;
        ext_col_10: string;
        weight: number;
      }

      export interface RootObject {
        module_id: number;
        list: List[];
      }
    }
  }

  export namespace Create {
    export namespace Response {
      export interface RootObject {
        addtag: string;
        tag_category_id: number;
        addtag_result: boolean;
        already_flg: boolean;
        tag_id: number;
        errors: string[];
      }
    }
  }
}
