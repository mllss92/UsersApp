import { User } from './user';

export interface AuthorizedUser {
  userData: User;
  isLogin: boolean;
  token: string;
}
