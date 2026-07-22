export interface IDayPlan {
  id: number;
  name: string;
  userId: string;
  isSystem: boolean;
  totalPrice: number;
  totalCalories: number;
  totalCarbs: number;
  totalFats: number;
  totalProtein: number;
  entries: IDayPlanEntry[];
}

export interface IDayPlanEntry {
  id: number;
  weight: number;
  name: string;
  time: number;
  recipeVersionId?: number;
  productVersionId?: number;
}
