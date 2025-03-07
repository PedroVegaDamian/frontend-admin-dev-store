import { useMutation } from "@pinia/colada";
import type { Product } from "../interfaces/product";
import { deleteProductById } from "../services";

export const useDeleteProduct = () => {
  const { mutateAsync: deleteProduct, data: productDeleted } = useMutation({
    mutation: (_id: Product["_id"]) => deleteProductById(_id),
  });

  return { deleteProduct, productDeleted };
};
