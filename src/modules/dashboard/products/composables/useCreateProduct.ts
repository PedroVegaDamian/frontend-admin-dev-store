import { useMutation } from "@pinia/colada";
import type { ProductDto } from "../interfaces/product";
import { addProduct } from "../services";

export const useCreateProduct = () => {
  const { mutateAsync: createProduct, data: productCreated } = useMutation({
    mutation: (product: ProductDto) => addProduct(product),
  });

  return { createProduct, productCreated };
};
