import type { Product } from "../interfaces/product";

const { VITE_API_URL } = import.meta.env;

export const getProducts = async () => {
  try {
    const response = await fetch(`${VITE_API_URL}/products`);
    return (await response.json()) as Product[];
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};
