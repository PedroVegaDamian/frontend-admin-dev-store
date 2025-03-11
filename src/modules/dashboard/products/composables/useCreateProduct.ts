import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useMutation } from "@pinia/colada";
import { watch } from "vue";
import type { ProductDto } from "../interfaces/product";
import { addProduct } from "../services";

export const useCreateProduct = () => {
  const { mutateAsync: createProduct, data: productCreated } = useMutation({
    mutation: (product: ProductDto) => addProduct(product),
  });

  const { toastNotification } = useToastNotification();

  watch(productCreated, () => {
    if (productCreated.value) {
      toastNotification({
        color: "green",
        message: `Producto Agregado: ${productCreated.value?.name}`,
      });
    }
  });

  return { createProduct, productCreated };
};
