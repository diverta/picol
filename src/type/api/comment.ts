export namespace CommentModel {
  export namespace Read {
    export namespace Response {
      export interface List {
        comment_header_id: number;
        mode_flg: string;
        rating_flg: number;
        latest_num: number;
        module_type: string;
        inst_ymdhi: string;
        update_ymdhi: string;
        status: number;
        use_limited_lang?: any;
        evaluation_type: number;
        report_flg: number;
        report_mail_flg: number;
        comment_id: number;
        note: string;
        url: string;
        mail: string;
        rating: number;
        module_id: number;
        open_flg: number;
        create_date: string;
        update_date: string;
        ext_data: string;
        lang: string;
        member_id: number;
        module_name: string;
        link: string;
        module_title?: any;
        topics_group_id?: any;
      }

      export interface RootObject {
        module_id: string;
        list: List[];
        pageInfo: any[];
      }
    }
  }

  export namespace Update {
    export namespace Response {
      export interface RootObject {
        messages?: string;
        errors: string[];
        id: number | null;
      }
    }
  }
}
