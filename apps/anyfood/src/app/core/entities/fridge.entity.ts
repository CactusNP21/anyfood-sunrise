export interface  IFridge
{
  id: number;
  items: IFridgeItemDto[];
}

export interface IFridgeItemDto
{
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  weight: number;
}
