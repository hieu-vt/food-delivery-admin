import { Image } from '@app/api/food.api';

export interface FoodModel {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Array<Image>;
  createdAt: string;
  updatedAt: string;
}

export interface FoodResponse {
  data: Array<DataFoodResponse>;
  paging: Paging;
}

export interface DataFoodResponse {
  id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  price: number;
  images: Array<Image>;
}

export interface Paging {
  page: number;
  limit: number;
  total: number;
  cursor: string;
  next_cursor: string;
}
