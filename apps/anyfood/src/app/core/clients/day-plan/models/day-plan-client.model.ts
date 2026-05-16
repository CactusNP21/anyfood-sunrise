export interface ICreateDayPlanRequest {
  name: string;
  entries: IDayPlanEntry[]
}

export interface IDayPlanRecipeEntry {
  recipeId: number;
  productId?: never;
  name: string;
  imageUrl: string;
  weight: number;
}

export interface IDayPlanProductEntry {
  recipeId?: never;
  productId: number;
  name: string;
  imageUrl: string;
  weight: number;
}

export type IDayPlanEntry = IDayPlanRecipeEntry | IDayPlanProductEntry;
