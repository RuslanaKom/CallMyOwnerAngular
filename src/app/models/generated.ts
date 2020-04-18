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

export interface AccessToken {
  accessToken: string;
  tokenType: string;
}

export interface StuffDto {
  id: string;
  userId: string;
  stuffName: string;
  contactEmail: string;
  defaultMessage: string;
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
