export interface IDayPlanEntry {
  id: number;
  dayPlanId: number;
  productId: number;
  weight: string;
  recipeVersionId?: number;
  productVersionId?: number;
}
