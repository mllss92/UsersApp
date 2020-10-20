export interface AuthorizedUser {
  userData: {
    name: string,
    email: string,
    isAdmin?: boolean
  };
  token: string;
}
