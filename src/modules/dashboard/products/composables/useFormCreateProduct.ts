import { reactive, ref, watch } from "vue";
import { useToastNotification } from "@/shared/composables/useToastNotification";
import { useProducts } from "../composables/useProducts";
import { ProductSchema } from "../schemas/product.schema";
import { defaultProductDto } from "../constants";
import type { EmitClosedDialog, ProductDto } from "../interfaces/product";

export const useFormCreateProduct = (
  emit: EmitClosedDialog,
  product: ProductDto
) => {
  const errors = ref<Record<string, string>>({});

  const newProduct = reactive<ProductDto>({ ...defaultProductDto });

  const { addOneProduct } = useProducts();
  const { toastNotification } = useToastNotification();

  if (product.name!.length > 0) {
    newProduct.name = product.name;
    newProduct.category = product.category;
    newProduct.image = product.image;
    newProduct.price = product.price;
    newProduct.stock = product.stock;
  }

  watch(newProduct, (newProduct) => {
    errors.value = {};

    const result = ProductSchema.safeParse({
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.value[issue.path.join()] = issue.message;
      });
    }
  });

  const onSubmit = async () => {
    if (Object.keys(errors.value).length !== 0) {
      toastNotification({
        message: "Todos los campos son obligatorios",
        color: "red",
      });
      return;
    }

    if (product.name!.length > 0) {
      //edit
    } else {
      await addOneProduct(newProduct);
    }

    emit("closed-dialog");
  };

  const onReset = () => {
    newProduct.name = "";
    newProduct.image = "";
    newProduct.category = "";
    newProduct.price = 0;
    newProduct.stock = 0;
  };

  return {
    onSubmit,
    onReset,
    newProduct,
    errors,
  };
};
