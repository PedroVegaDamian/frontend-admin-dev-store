import { reactive } from "vue";
import { useProducts } from "../composables/useProducts";
import { defaultProductDto } from "../constants";
import type { ProductDto } from "../interfaces/product";

export const useFormCreateProduct = () => {
  const newProduct = reactive<Required<ProductDto>>({ ...defaultProductDto });

  const { addOneProduct } = useProducts();

  const onSubmit = async () => {
    await addOneProduct(newProduct);
  };

  const onReset = () => {
    Object.assign(newProduct, defaultProductDto);
  };

  return {
    onReset,
    onSubmit,
    newProduct,
  };
};
