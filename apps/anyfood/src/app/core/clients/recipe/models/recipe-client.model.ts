import { IProduct } from '../../../entities/product/product.entity';
import { IRecipeCategory } from '../../../entities/recipe-category.entity';
import { ICategory } from '../../../entities/category/category.entity';

export interface ICreateRecipeRequest {
  name: string;
  imageUrl: string;
  recipeProducts: {weight: number; productId: number}[];
  recipeCategories: IRecipeCategory[];
  portions: number;
  description: string;
  duration: number;
}
