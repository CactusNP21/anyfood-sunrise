export interface IProduct {
  id: number;
  name: string;
  imgUrl: string;
}

export interface IProductCreateRequest {
  name: string;
  imgUrl: string;
  carbs: string;
  fats: string;
  protein: string;
}


