import { IIngredient } from './ingredient.model';


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
