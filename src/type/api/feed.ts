export namespace FeedModel {
  export namespace Create {
    export namespace Response {
      export interface RootObject {
        status: string;
        topics_id: string;
        errors: any[];
        validation_errors: any[];
        messages: string[];
      }
    }
  }

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

      export interface RelTagList {
        tag_id: number;
        tag_nm: string;
        open_contents_cnt: number;
        all_contents_cnt: number;
        open_flg: number;
        dflg: number;
        admin_nm: string;
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

      export interface Comment {
        note: string;
        ext_data: string;
        name: string;
        create_date: string;
        update_member_id: number;
        comment_id: number;
      }

      export interface Feed {
        topics_id: number;
        season: number;
        ymd: string;
        contents_type: number;
        contents: string;
        subject: string;
        topics_flg: number;
        link_flg: number;
        link_url: string;
        open_flg: number;
        regular_flg: number;
        inst_ymdhi: string;
        update_ymdhi: string;
        topics_group_id: number;
        keywords: string;
        description: string;
        pdf_title1: string;
        pdf_title2: string;
        pdf_title3: string;
        ext_col_01: { url: string; value: string }[] | null;
        ext_col_02: string;
        ext_col_03: string;
        ext_col_04: {
          desc: string;
          id: string;
          url: string;
        }[];
        ext_col_05: string;
        ext_col_06: { url: string; value: string } | null;
        ext_col_07: string;
        ext_col_08: string;
        ext_col_09: string;
        ext_col_10: string;
        ext_col_11: string;
        ext_col_12: string;
        ext_col_13: string;
        ext_col_14: string;
        ext_col_15: string;
        page_cnt: number;
        captions: string;
        ext_col_16: string;
        ext_col_17: string;
        ext_col_18: string;
        ext_col_19: string;
        ext_col_20: string;
        ext_col_21: string;
        ext_col_22: string;
        ext_col_23: string;
        ext_col_24: string;
        ext_col_25: string;
        ext_col_26: string;
        ext_col_27: string;
        ext_col_28: string;
        ext_col_29: string;
        ext_col_30: string;
        id_alias: string;
        org_file_nm: string;
        post_time: string;
        ext_group_sort: string;
        contents_type_expand: string;
        ext_col_31: string;
        ext_col_32: string;
        ext_col_33: string;
        ext_col_34: string;
        ext_col_35: string;
        ext_col_36: string;
        ext_col_37: string;
        ext_col_38: string;
        ext_col_39: string;
        ext_col_40: string;
        original_url: string;
        original_url_page_sysnm: string;
        ogp_data: string;
        ymd_str: string;
        days_ago: string;
        group_nm: string;
        no_use_ymd: number;
        contents_type_cnt: number;
        group_description: string;
        group_ext_data: string;
        favorite_cnt: number;
        last_update_comment: string;
        contents_type_nm: string;
        contents_type_parent_nm: string;
        category_parent_id: string;
        contents_type_ext_col_01: string;
        contents_type_ext_col_02: string;
        contents_type_ext_col_03: string;
        contents_org: string;
        link_page_sysnm: string;
        comment_cnt: number;
        ext_columns: ExtColumns;
        member_id: number;
        my_favorite_flg: boolean;
        tags: Tag[];
      }

      export interface Tag {
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

      export interface Straight {
        no: string;
        ext_col_nm: string;
        title: string;
        type: string;
        options: any;
        limits: any;
        ext_title: string;
        ext_type: string;
        ext_option: string;
        ext_group_id?: any;
        ext_group_parent_ext_col: string;
        ext_group_loop: number;
        ext_order_no: number;
        ext_limit_item: string;
        ext_parent_col_nm: string;
        topics_group_ext_id: number;
        ext_help_msg: string;
        ext_template: string;
        separator?: any;
        ext_option_parent_id?: any;
        default_selection: string;
        default_value: string;
        value: any;
        name: string;
        disp_group_order: number;
        disp_group_no: any;
        topics_group_id: number;
        repeatCnt?: number;
        file_url: string;
        file_url_L?: any;
        file_url_S?: any;
        afterSortShowFirst: string;
      }

      interface Options {
        emergency_type0: string;
        emergency_type1: string;
        emergency_type2: string;
      }

      interface Limits {
        required: string;
      }

      interface Options2 {
        add_time: string;
      }

      interface Value {
        ymd: string;
        h: string;
        i: string;
      }

      interface Options3 {
        ext_no_image_explain: string;
      }

      interface Group {
        no: string;
        ext_col_nm: string;
        title: string;
        type: string;
        options: Options3;
        limits: any[];
        ext_title: string;
        ext_type: string;
        ext_option: string;
        ext_group_id?: any;
        ext_group_parent_ext_col: string;
        ext_group_loop: number;
        ext_order_no: number;
        ext_limit_item: string;
        ext_parent_col_nm: string;
        topics_group_ext_id: number;
        ext_help_msg: string;
        ext_template: string;
        separator?: any;
        ext_option_parent_id?: any;
        default_selection: string;
        default_value: string;
        repeatCnt: number;
        value: string;
        name: string;
        disp_group_order: number;
        disp_group_no: string;
        file_url?: string;
        file_url_L?: any;
        file_url_S?: any;
        afterSortShowFirst?: string;
      }

      export interface Groups {
        [group: number]: Group[];
      }

      export interface ExtColumns {
        straight: Straight[];
        group: Groups;
      }

      export interface RootObject {
        pageInfo: PageInfo;
        list: Feed[];
      }
    }
  }

  export namespace Update {
    export namespace Response {
      export interface RootObject {
        errors: string[];
        messages: string[];
        debug_output: string;
        validation_errors: string[];
      }
    }
  }

  export namespace Delete {
    export namespace Response {
      export interface RootObject {
        errors: string[];
        messages: string[];
        debug_output: string;
        validation_errors: string[];
      }
    }
  }

  export interface MediaFromFeed {
    type: 'image' | 'video';
    file_id: string;
    file_nm: string;
    url: string;
    id?: string;
  }
}
