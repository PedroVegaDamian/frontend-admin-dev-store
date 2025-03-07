import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useMutation } from "@pinia/colada";
import { watch } from "vue";
import type { Product } from "../interfaces/product";
import { deleteProductById } from "../services";

export const useDeleteProduct = () => {
  const { toastNotification } = useToastNotification();
  const { mutateAsync: deleteProduct, data: productDeleted } = useMutation({
    mutation: (_id: Product["_id"]) => deleteProductById(_id),
  });

  watch(productDeleted, () => {
    if (productDeleted.value) {
      toastNotification({
        message: `Producto Eliminado: ${productDeleted.value?.name}`,
        color: "red",
      });
    }
  });

  return { deleteProduct, productDeleted };
};
