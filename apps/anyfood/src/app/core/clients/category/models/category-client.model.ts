export interface ICategoryResponse {
  id: number;
  name: string;
  productCount: number;
}

export interface ICreateCategoryRequest {
  name: string;
}

export interface IUpdateCategoryRequest {
  name: string;
}
