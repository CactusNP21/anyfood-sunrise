export interface IProduct {
  id: number;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  glycemicIndex: number;
  imageUrl: string;
  price: number;
  isSystem: boolean;
  categoryId: number;
  categoryName: string;
  userId: string;
}

