import type { Product, ProductDto } from "../interfaces/product";

const { VITE_API_URL } = import.meta.env;

export interface QueryParams {
  limit?: number;
  offset?: number;
}

export const getProducts = async (queryParams: QueryParams) => {
  try {
    const response = await fetch(
      `${VITE_API_URL}/products?limit=${queryParams.limit}${
        queryParams.offset ? `&offset=${queryParams.offset}` : ""
      }`
    );
    const data = await response.json();
    return data as { data: Product[]; total: number };
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

export const deleteProductById = async (_id: Product["_id"]) => {
  try {
    const response = await fetch(`${VITE_API_URL}/products/${_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data as Product;
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};

export const addProduct = async (product: ProductDto) => {
  try {
    const response = await fetch(`${VITE_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok)
      throw new Error(`Error al agregar prodcuto: ${response.statusText}`);

    const data = await response.json();
    return data as Product;
  } catch (error) {
    throw new Error("Error al agregar producto");
  }
};

export const editProduct = async (product: ProductDto, _id: Product["_id"]) => {
  try {
    const response = await fetch(`${VITE_API_URL}/products/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok)
      throw new Error(`Error al editar prodcuto: ${response.statusText}`);

    const data = await response.json();
    return data as Product;
  } catch (error) {
    throw new Error("Error al editar producto");
  }
};
