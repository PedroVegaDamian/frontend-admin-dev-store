import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useMutation } from "@pinia/colada";
import { watch } from "vue";
import type { ProductDto } from "../interfaces/product";
import { editProduct } from "../services";

export const useEditProduct = () => {
  const { mutateAsync: editOneProduct, data: productEdited } = useMutation({
    mutation: (product: ProductDto) => editProduct(product),
  });

  const { toastNotification } = useToastNotification();

  watch(productEdited, () => {
    if (productEdited.value) {
      toastNotification({
        message: `Producto Editado: ${productEdited.value?.name}`,
        color: "green",
      });
    }
  });

  return { editOneProduct, productEdited };
};
