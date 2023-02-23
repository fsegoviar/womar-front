export interface Login {
  accessToken: string;
  email: string;
  tipo: TypeUser;
}

export enum TypeUser {
  LOCAL = 1,
  GOOGLE = 2,
  FACEBOOK = 3
}
