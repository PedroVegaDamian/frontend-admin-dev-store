import type { Category, ProductDto } from "../interfaces/product";

export const defaultProductDto: Required<ProductDto> = {
  name: "",
  image: "",
  category: "",
  price: 0,
  stock: 0,
};

export const categoryOptions: Category[] = ["cojines", "hombre", "mousepad"];
