import { IProduct } from './product.model';
import { IIngredient } from './ingredient.model';

export interface IDishFormModel {
  name: string;
  description: string;
  imageUrl: string;
  products: (IProduct & {weight: string})[];
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  ingredients: IIngredient[];
}

export interface ICreateDishIngredient {
  productId: number;
  weight: string;
}

export interface IDishCreateRequest {
  name: string;
  description: string;
  ingredients: ICreateDishIngredient[];
}
