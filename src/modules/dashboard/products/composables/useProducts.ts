import { computed, ref, watch } from "vue";

import type { Product } from "../interfaces/product";
import { useCreateProduct } from "./useCreateProduct";
import { useDeleteProduct } from "./useDeleteProduct";
import { useGetProducts } from "./useGetProducts";

const pagination = ref({
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 5,
});

export const useProducts = () => {
  const queryParams = computed(() => ({
    limit: pagination.value.rowsPerPage,
    offset: (pagination.value.page - 1) * pagination.value.rowsPerPage,
  }));

  const { error, isLoading, products, refresh } = useGetProducts(queryParams);
  const { createProduct, productCreated } = useCreateProduct();
  const { deleteProduct, productDeleted } = useDeleteProduct();

  const editProduct = (product: Product) => {
    // TODO: Implementar request PATCH
  };

  // TODO: refactorizar y legibilizar
  watch(
    () => [products.value.data, productDeleted.value, productCreated.value],
    async () => {
      await refresh();
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
