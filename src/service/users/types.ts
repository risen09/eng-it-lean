export interface User {
    id: number;
    public_id: number;
    email: string;
    password: string;
}
  
export type GetUserListResponse = Array<User>;
export type GetUserResponse = User;
export type GetLoginResponse = {public_id: number};
export type GetLoginRequest = {email: string, password: string};