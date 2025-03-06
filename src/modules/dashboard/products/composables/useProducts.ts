import { ref, watch } from "vue";

import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useQuery } from "@pinia/colada";
import type { AddProduct, Product } from "../interfaces/product";
import { addProduct, deleteProductById, getProducts } from "../services";

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

  const deleteOneProduct = async (_id: Product["_id"]) => {
    try {
      const productDeleted = await deleteProductById(_id);

      refresh();

      toastNotification({
        message: `Producto Eliminado: ${productDeleted.name}`,
        color: "red",
      });
    } catch (error) {
      throw new Error("Ocurred an error");
    }
  };

  const addOneProduct = async (product: AddProduct) => {
    try {
      const addedProduct = await addProduct(product);

      refresh();

      toastNotification({
        message: `Producto Agregado: ${addedProduct.name}`,
        color: "green",
      });
    } catch (error) {
      throw new Error("Ocurred an error al agregar producto");
    }
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
    addOneProduct,
    deleteOneProduct,
  };
};
