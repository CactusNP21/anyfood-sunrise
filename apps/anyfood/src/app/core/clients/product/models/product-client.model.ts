import { IProduct } from '../../../entities/product/product.entity';

export interface ICategoryResponse {

}

// Create — omit server-generated fields
export type ICreateProductRequest = Omit<IProduct, 'id' | 'categoryName' | 'userId'>

// Update — same as create but without isSystem
export type IUpdateProductRequest = Omit<ICreateProductRequest, 'isSystem'>

