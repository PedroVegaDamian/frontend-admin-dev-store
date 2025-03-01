import { ref, watch } from "vue";

import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useQuery } from "@pinia/colada";
import type { Product } from "../interfaces/product";
import { getProducts } from "../services";

export const useProducts = () => {
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: 5,
  });

  const {
    error,
    isLoading,
    data: products,
  } = useQuery({
    key: () => [
      "products",
      pagination.value.page,
      pagination.value.rowsPerPage,
    ],
    query: () =>
      getProducts({
        limit: pagination.value.rowsPerPage,
        offset: (pagination.value.page - 1) * pagination.value.rowsPerPage,
      }),
    refetchOnWindowFocus: false,
    placeholderData: {
      data: [],
      total: 0,
    },
  });

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
    // products.value = products.value.filter((item) => item._id !== _id);
    toastNotification({
      message: "Producto Eliminado",
      color: "red",
    });
  };

  watch(
    products,
    () => {
      pagination.value.rowsNumber = products.value.total;
    },
    { once: true }
  );

  return {
    error,
    products,
    isLoading,
    pagination,
    editProduct,
    deleteProductById,
  };
};
