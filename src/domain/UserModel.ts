import { Image } from '@app/api/food.api';

export interface LoginResponse {
  data: DataLogin;
}

export interface DataLogin {
  token: string;
  created: Date;
  expiry: number;
}

export interface UserModel {
  data: DataUserModal;
}

export interface DataUserModal {
  id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  last_name: string;
  first_name: string;
  phone: string;
  role: string;
  avatar: Image;
}
