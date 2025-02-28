export interface Product {
  _id: string;
  image: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum Category {
  Cojines = "cojines",
  Hombre = "hombre",
  Mousepad = "mousepad",
}
