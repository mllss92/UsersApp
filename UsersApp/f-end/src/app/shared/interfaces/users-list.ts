import { Pagination } from './pagination';
import { User } from './user';

export interface UsersList {
  data: User[];
  pagination: Pagination;
}
