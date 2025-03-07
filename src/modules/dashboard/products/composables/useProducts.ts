import { ref, watch } from "vue";

import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useQuery } from "@pinia/colada";
import type { Product, ProductDto } from "../interfaces/product";
import { getProducts } from "../services";
import { useCreateProduct } from "./useCreateProduct";
import { useDeleteProduct } from "./useDeleteProduct";

const pagination = ref({
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 5,
});

export const useProducts = () => {
  const {
    error,
    isLoading,
    data: products,
    refresh,
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
    staleTime: 0,
    refetchOnWindowFocus: false,
    placeholderData: {
      data: [],
      total: 0,
    },
  });

  const { createProduct, productCreated } = useCreateProduct();
  const { deleteProduct, productDeleted } = useDeleteProduct();
  const { toastNotification } = useToastNotification();

  const editProduct = (product: Product) => {
    // TODO: Implementar request PATCH
    toastNotification({
      message: "Producto Actualizado",
      color: "orange",
    });
  };

  const deleteOneProduct = async (_id: Product["_id"]) => {
    try {
      await deleteProduct(_id);

      await refresh();

      toastNotification({
        message: `Producto Eliminado: ${productDeleted.value?.name}`,
        color: "red",
      });
    } catch (error) {
      throw new Error("Ocurred an error");
    }
  };

  const addOneProduct = async (product: ProductDto) => {
    try {
      await createProduct(product);

      await refresh();

      toastNotification({
        message: `Producto Agregado: ${productCreated.value?.name}`,
        color: "green",
      });
    } catch (error) {
      throw new Error("An error occurred while adding product");
    }
  };

  watch(
    () => [products.value.data, productDeleted.value, productCreated.value],
    () => {
      if (!products.value.total) return;
      pagination.value.rowsNumber = products.value.total;
    }
  );

  return {
    error,
    products,
    isLoading,
    pagination,
    editProduct,
    addOneProduct,
    deleteOneProduct,
  };
};
