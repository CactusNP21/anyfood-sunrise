export interface IDayPlanEntry {
  id: number;
  name: string;
  dayPlanId: number;
  productId: number;
  weight: string;
  recipeVersionId?: number;
  productVersionId?: number;
}
