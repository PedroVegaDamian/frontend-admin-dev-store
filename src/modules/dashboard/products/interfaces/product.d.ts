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

export interface AddProduct {
  image: string | null;
  name: string | null;
  category: Category | null;
  price: number | null;
  stock: number | null;
}
