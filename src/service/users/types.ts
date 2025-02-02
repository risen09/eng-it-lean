export interface User {
    id: number;
    email: string;
    password: string;
}
  
export type GetUserListResponse = Array<User>;
export type GetUserResponse = User;
  