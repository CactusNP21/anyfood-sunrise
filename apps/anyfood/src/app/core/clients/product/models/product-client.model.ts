// apps/anyfood/src/app/core/clients/product/models/product-client.model.ts

import { IProduct } from '../../../entities/product/product.entity';

// Create — omit server-generated fields, categoryIds is now an array
export type ICreateProductRequest = Omit<
  IProduct,
  | 'id'
  | 'isSystem'
  | 'calories'
  | 'userId'
  | 'priceHistory'
  | 'glycemicIndex'
>

// Update — same shape
export type IUpdateProductRequest = ICreateProductRequest;
