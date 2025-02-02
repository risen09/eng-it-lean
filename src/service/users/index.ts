import { network } from '../network';
import { GetLoginRequest, User } from './types';
import { GetUserListResponse, GetUserResponse, GetLoginResponse } from './types';

class UserService {
  async getUsers() {
    const response = await network.get<GetUserListResponse>('/users');
    return response.data;
  }

  async getUser(id: number) {
    const response = await network.get<GetUserResponse>(`/users/${id}`);
    return response.data;
  }

  async postUsers(user: User){
    const response = await network.post<GetUserResponse>('/users', user);
    return response.data;
  }

  async postLogin(user: GetLoginRequest){
    const response = await network.post<GetLoginResponse>('/users/login', user);
    return response.data;
  }
}

export const userService = new UserService();
