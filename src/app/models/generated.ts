export interface User {
  login_name: string;
  login_type: string;
}

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserAccountDto {
  username: string;
  password: string;
  defaultEmail: string;
}

export interface UserAccountWithTokenDto {
  userAccountDto: UserAccountDto;
  accessToken: AccessToken;
}

export interface AccessToken {
  accessToken: string;
  tokenType: string;
}

export interface StuffDto {
  id: string;
  userId: string;
  stuffName: string;
  defaultMessage: string;
}

export interface MessageDto {
  id: string;
  stuffName: string;
  messageText: string;
  receivedDate: Date;
  new: boolean;
}

export interface AdvDto {
  id: string;
  header: string;
  text: string;
  type: string;
  category: string;
  phone: string;
  region: string;
  imageUrl: string[];
  date: Date;
}

export class PageableResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
