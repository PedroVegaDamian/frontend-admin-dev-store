import { ref, watch } from "vue";

import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useMutation, useQuery } from "@pinia/colada";
import type { Product, ProductDto } from "../interfaces/product";
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

  const { mutateAsync: deleteProduct } = useMutation({
    mutation: (_id: Product["_id"]) => deleteProductById(_id),
  });

  const { mutateAsync: addNewProduct } = useMutation({
    mutation: (product: ProductDto) => addProduct(product),
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
      const productDeleted = await deleteProduct(_id);

      refresh();

      toastNotification({
        message: `Producto Eliminado: ${productDeleted.name}`,
        color: "red",
      });
    } catch (error) {
      throw new Error("Ocurred an error");
    }
  };

  const addOneProduct = async (product: ProductDto) => {
    try {
      const productAdded = await addNewProduct(product);

      refresh();

      toastNotification({
        message: `Producto Agregado: ${productAdded.name}`,
        color: "green",
      });
    } catch (error) {
      throw new Error("An error occurred while adding product");
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
