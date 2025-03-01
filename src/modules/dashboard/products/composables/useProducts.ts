import { onMounted, ref } from "vue";

import { getProducts } from "../services";
import type { Product } from "../interfaces/product";
import { useToastNotification } from "@/shared/composables/useToastNotification";

export const useProducts = () => {
  const products = ref<Product[]>([]);

  const { toastNotification } = useToastNotification();

  const editProduct = (product: Product) => {
    // TODO: Implementar request PATCH
    toastNotification({
      message: "Producto Actualizado",
      color: "orange",
    });
  };

  const deleteProductById = async (_id: Product["_id"]) => {
    // TODO: Implementar request DELETE, averiguar por que lanza el warinig
    products.value = products.value.filter((item) => item._id !== _id);
    toastNotification({
      message: "Producto Eliminado",
      color: "red",
    });
  };

  onMounted(async () => {
    const dataProducts = await getProducts();
    products.value = dataProducts;
  });

  return {
    products,
    editProduct,
    deleteProductById,
  };
};
