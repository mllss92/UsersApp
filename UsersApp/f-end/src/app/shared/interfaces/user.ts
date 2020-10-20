export interface User {
  name: string;
  email?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  _id?: string;
  isAdmin?: boolean;
}
