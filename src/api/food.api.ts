import { httpApi } from '@app/api/http.api';
// import './mocks/auth.api.mock';
import { LoginResponse } from '@app/domain/UserModel';

export interface FoodRequest {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface GetRequest {
  page?: number;
  limit?: number;
}

export const createFood = (foodPayload: FoodRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>('foods', { ...foodPayload }).then(({ data }) => data);

export const getFood = (signUpData: GetRequest): Promise<undefined> =>
  httpApi.post<undefined>('foods', { ...signUpData }).then(({ data }) => data);
