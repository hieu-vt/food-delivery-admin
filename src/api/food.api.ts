import { httpApi } from '@app/api/http.api';
import { FoodModel } from '@app/domain/FoodModal';
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

export interface GetFoodRequest {
  page?: number;
  limit?: number;
}

export const createFood = (foodPayload: FoodRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>('foods', { ...foodPayload }).then(({ data }) => data);

export const getFoods = (params?: GetFoodRequest | null): Promise<any> =>
  httpApi.get<FoodModel>('foods', { params }).then(({ data }) => data);
