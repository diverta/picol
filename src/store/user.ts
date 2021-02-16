import { CONSTANTS } from '@/core/constants';
import { AuthenticationService } from '@/kuroco_api/services/AuthenticationService';
import { MembersService } from '@/kuroco_api/services/MembersService';
import store from '@/store/store';
import { AccountModel } from '@/type/api';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

export interface IUserState {
  users: AccountModel.Read.Response.Details[];
  selfUserMemberId: number;
}

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule implements IUserState {
  apis = {
    members: MembersService,
    authentication: AuthenticationService,
  };
  users: AccountModel.Read.Response.Details[] = [];

  selfUserMemberId!: number;

  get selfUser() {
    return (this.users.find((user) => user.member_id === this.selfUserMemberId) ||
      {}) as AccountModel.Read.Response.Details;
  }

  get getUserName(): (memberId: number) => string {
    return (memberId) => {
      const user = this.users.find(({ member_id }) => member_id === memberId) || ({} as any) || {};
      return user.nickname || '名無しさん';
    };
  }

  get getImage(): (memberId: number) => string {
    return (memberId) => {
      const user = this.users.find(({ member_id }) => member_id === memberId) || ({} as any);
      return !!user && user.image_url !== false ? (user.image_url as string) : CONSTANTS.UNKNOWN_USER_IMAGE_PATH;
    };
  }

  get myImage(): string {
    return !!this.selfUser && this.selfUser.image_url !== undefined
      ? (this.selfUser.image_url as string) + '&v=' + Math.random() // remove cache
      : CONSTANTS.UNKNOWN_USER_IMAGE_PATH;
  }

  @Action({ rawError: true })
  async initialize(query: { member_id?: number }) {
    let member_id = query.member_id;
    if (member_id === undefined) {
      member_id = (await this.apis.authentication.getAuthenticationServiceRcmsApi1Profile({})).body.member_id as number;
    }

    this.UPDATE_SELF_USER_MEMBER_ID(member_id);
    await this.readMemberInfos({ id: [member_id] });
  }

  @Action({ rawError: true })
  async readMemberInfos(query: Parameters<typeof MembersService.getMembersServiceRcmsApi1Members>[0]) {
    const { list } = (await this.apis.members.getMembersServiceRcmsApi1Members(query))
      .body as AccountModel.Read.Response.RootObject;
    this.UPDATE_ALL_USERS(list as AccountModel.Read.Response.Details[]);
  }

  @Action({ rawError: true })
  async updateUser(query: Parameters<typeof MembersService.postMembersServiceRcmsApi1MemberUpdate>[0]) {
    await this.apis.members.postMembersServiceRcmsApi1MemberUpdate(query);
    await this.readMemberInfos({
      id: [this.selfUser.member_id],
    });
  }

  @Action({ rawError: true })
  async updatePassword({ password }: { password: string }) {
    const { name1, name2, nickname } = this.selfUser;
    const query: Parameters<typeof MembersService.postMembersServiceRcmsApi1MemberUpdate>[0] = {
      requestBody: {
        login_pwd: password,
        nickname,
      },
    };
    const account = (await this.apis.members.postMembersServiceRcmsApi1MemberUpdate(query))
      .body as AccountModel.Update.Response.RootObject;
    this.UPDATE_SELF_MEMBER_INFO(account);
    return account;
  }

  @Action({ rawError: true })
  addMembers(payload: AccountModel.Read.Response.Details[]) {
    this.ADD_USERS(payload);
  }

  @Mutation
  private UPDATE_ALL_USERS(users: AccountModel.Read.Response.Details[]) {
    const cpy = [...this.users];
    users.forEach((user) => {
      const idx = cpy.findIndex(({ member_id }) => user.member_id === member_id);
      idx !== -1 ? (cpy[idx] = user) : cpy.push(user);
    });
    this.users.replaceAll(cpy);
  }

  @Mutation
  private ADD_USERS(users: AccountModel.Read.Response.Details[]) {
    const newUsers = users.filter((newUser) => !this.users.map((u) => u.member_id).includes(newUser.member_id));
    this.users.push(...newUsers);
  }

  @Mutation
  private UPDATE_SELF_MEMBER_INFO(selfUser: AccountModel.Update.Response.RootObject) {
    this.selfUser.member_id = selfUser.member_id;
  }

  @Mutation
  private UPDATE_SELF_USER_MEMBER_ID(selfUserMemberId: number) {
    this.selfUserMemberId = selfUserMemberId;
  }
}

export const UserStateModule = getModule(User);
