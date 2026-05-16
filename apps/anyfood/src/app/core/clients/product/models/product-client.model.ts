import { IProduct } from '../../../entities/product/product.entity';

// Create — omit server-generated fields
export type ICreateProductRequest = Omit<IProduct, 'id'| 'isSystem' | 'calories' | 'userId' | 'priceHistory'>;

// Update — same as create but without isSystem
export type IUpdateProductRequest = Omit<ICreateProductRequest, 'isSystem'>;
