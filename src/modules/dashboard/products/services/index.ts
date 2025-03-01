import type { Product } from "../interfaces/product";

const { VITE_API_URL } = import.meta.env;

interface QueryParams {
  limit?: number;
  offset?: number;
}

export const getProducts = async (queryParams: QueryParams) => {
  try {
    const { limit = 10, offset = 0 } = queryParams;

    const response = await fetch(
      `${VITE_API_URL}/products?limit=${limit}${
        offset ? `&offset=${offset}` : ""
      }`
    );
    const data = await response.json();
    return data as { data: Product[]; total: number };
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};
