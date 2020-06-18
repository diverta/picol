export namespace ProfileModel {
  export namespace Read {
    export namespace Response {
      export interface RootObject {
        member_id: number;
        group_ids: { [typeNumber: string]: string };
        rcmsid: null;
        shash: string;
      }
    }
  }
}
