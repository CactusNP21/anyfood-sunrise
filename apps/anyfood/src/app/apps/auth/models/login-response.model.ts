import { IUser } from './user.model';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: IUser;
}
