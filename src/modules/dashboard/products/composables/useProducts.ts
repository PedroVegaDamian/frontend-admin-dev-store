import { ref, watch } from "vue";

import { useQuery } from "@pinia/colada";
import type { Product } from "../interfaces/product";
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

  const editProduct = (product: Product) => {
    // TODO: Implementar request PATCH
  };

  watch(
    () => [products.value.data, productDeleted.value, productCreated.value],
    () => {
      refresh();
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
    addOneProduct: createProduct,
    deleteOneProduct: deleteProduct,
  };
};
