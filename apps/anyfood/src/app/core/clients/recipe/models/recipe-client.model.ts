export interface ICreateRecipeRequest {
  name: string;
  imageUrl: string;
  recipeProducts: { productId: number; weight: number }[];
  recipeCategories: { id: number }[];
  portions: number;
  description: string;
  duration: number;
}

export type IUpdateRecipeRequest = ICreateRecipeRequest;
