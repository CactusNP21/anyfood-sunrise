import { IRecipe } from '../../../entities/recipe/recipe.entity';
import { IProduct } from '../../../entities/product/product.entity';

export interface ICreateDayPlanRequest {
  name: string;
  entries: IDayPlanEntry[];
}

export interface IDayPlanRecipeEntry {
  recipeId: number;
  productId?: never;
  name: string;
  imageUrl: string;
  weight: number;
  time: number;
  recipe: IRecipe
}

export interface IDayPlanProductEntry {
  recipeId?: never;
  productId: number;
  name: string;
  imageUrl: string;
  weight: number;
  time: number;
  product: IProduct;
}

export type IDayPlanEntry = IDayPlanRecipeEntry | IDayPlanProductEntry;
