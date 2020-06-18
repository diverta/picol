export namespace AccountModel {
  export namespace Read {
    export namespace Response {
      export interface Details {
        acount_kind?: any;
        acount_num?: any;
        acount_user?: any;
        address1?: any;
        address1_2?: any;
        address2?: any;
        address2_2?: any;
        aliaslogin_end_ymd?: any;
        aliaslogin_member_id?: any;
        aliaslogin_start_ymd?: any;
        api_key: string;
        bank_num?: any;
        bikou?: any;
        birth?: any;
        brench_num?: any;
        com_address1?: any;
        com_address2?: any;
        com_email?: any;
        com_fax?: any;
        com_nm?: any;
        com_position?: any;
        com_post?: any;
        com_tdfk_cd?: any;
        com_tel?: any;
        com_zip_main?: any;
        com_zip_sub?: any;
        contact_open_flg?: any;
        dflg: number;
        ec_point?: any;
        ec_subscribing_user_flg: number;
        elementary_school?: any;
        email: string;
        email2?: any;
        email_mobile?: any;
        email_send_ng_flg?: any;
        fax?: any;
        fax2?: any;
        force_chpwd?: any;
        hashed_pass?: any;
        height?: any;
        high_school?: any;
        identity_id?: any;
        inst_ymdhi: string;
        jrhigh_school?: any;
        login_id: string;
        login_ok_flg: number;
        login_ok_ymd?: any;
        login_pwd: string;
        login_pwd_md5: string;
        m_email?: any;
        member_id: number;
        name1: string;
        name2: string;
        name_old?: any;
        namekana1: string;
        namekana2: string;
        nameroma1?: any;
        nameroma2?: any;
        nickname: string;
        open_flg: number;
        openid?: any;
        order_no: number;
        pass_salt: string;
        rcmsid?: any;
        sex?: any;
        tdfk2_99?: any;
        tdfk_99?: any;
        tdfk_cd?: any;
        tdfk_cd2?: any;
        tel?: any;
        tel2?: any;
        university?: any;
        update_subscription?: any;
        update_ymdhi: string;
        weight?: any;
        zip_main?: any;
        zip_main2?: any;
        zip_sub?: any;
        zip_sub2?: any;
        gk_position?: any;
        team_name?: any;
        member_cd?: any;
        last_chk_activity: string;
        disp_name: string;
        name: string;
        hs_sname?: any;
        hs_name?: any;
        univ_short_nm?: any;
        univ_name?: any;
        image_exist: boolean;
        image_s_exist: boolean;
        image_s_url?: string;
        image_url?: string;
        subData?: any;
      }

      export interface RootObject {
        details?: Details;
        list?: Details[];
      }
    }
  }

  export namespace Update {
    export namespace Response {
      export interface ValidationErrors {
        email: string[];
        login_pwd: string[];
      }

      export interface RootObject {
        status: string;
        member_id: number;
        errors: string[];
        validation_errors: ValidationErrors;
        messages: any[];
      }
    }
  }
}
