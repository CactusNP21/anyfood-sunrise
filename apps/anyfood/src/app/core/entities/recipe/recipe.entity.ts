import { IProduct } from '../product/product.entity';
import { IRecipeCategory } from '../recipe-category.entity';

export interface IRecipe {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  products: (IProduct & {weight: number})[];
  recipeCategories: IRecipeCategory[];
  portions: number;
  latestVersionId: number;
  description: string;
  duration: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  userId: string | null;
  isSystem: boolean;
}
