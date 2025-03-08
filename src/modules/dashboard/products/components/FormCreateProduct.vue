<script setup lang="ts">
  import { useToastNotification } from "@/shared/composables/useToastNotification";
  import { reactive } from "vue";
  import { useProducts } from "../composables/useProducts";
  import type { Category, ProductDto } from "../interfaces/product";

  type Emits = (e: "closed-dialog") => void;

  const emit = defineEmits<Emits>();

  const newProduct = reactive<ProductDto>({
    name: "",
    image: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const categoryOptions: Category[] = ["cojines", "hombre", "mousepad"];

  const { addOneProduct } = useProducts();
  const { toastNotification } = useToastNotification();

  const onSubmit = async () => {
    const haveName = !!newProduct.name?.trim();
    const haveUrlImage = !!newProduct.image?.trim();
    const haveCategory = !!newProduct.category?.trim();
    const havePrice = !!(newProduct.price ?? 0);
    const haveStock = !!(newProduct.stock ?? 0);

    if (
      !haveName ||
      !haveUrlImage ||
      !haveCategory ||
      !havePrice ||
      !haveStock
    ) {
      toastNotification({
        message: "Por favor, complete todos los campos obligatorios",
        color: "red",
      });
    }

    await addOneProduct(newProduct);

    emit("closed-dialog");
  };

  const onReset = () => {
    newProduct.name = "";
    newProduct.image = "";
    newProduct.category = "";
    newProduct.price = 0;
    newProduct.stock = 0;
  };
</script>

<template>
  <div class="q-pa-md sm:w-[450px]" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        lazy-rules
        label="Nombre *"
        v-model="newProduct.name"
        hint="Agregar nombre de Producto"
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor tipear un nombre',
        ]"
      />

      <q-input
        filled
        label="Url Imagen *"
        v-model="newProduct.image"
        hint="Agregar un Link de imagen para el Producto"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor ingrese un link',
          (val) =>
            /^(https?:\/\/.*)$/.test(val) || 'Ingrese una URL válida de imagen',
        ]"
      />

      <q-select
        label="Categoría"
        :options="categoryOptions"
        v-model="newProduct.category"
      />

      <q-input
        filled
        lazy-rules
        step="0.01"
        :min="0.01"
        type="number"
        label="Precio *"
        v-model="newProduct.price"
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Por favor ingrese el precio',
          (val) => !isNaN(val) || 'Ingrese un número válido',
          (val) =>
            parseFloat(val) > 0 ||
            'Por favor ingrese un valor numérico positivo',
        ]"
      />

      <q-input
        filled
        :min="1"
        lazy-rules
        type="number"
        label="Stock *"
        v-model="newProduct.stock"
        :rules="[
          (val) => (val !== null && val !== '') || 'Por favor ingrese el stock',
          (val) => !isNaN(val) || 'Ingrese un número válido',
          (val) =>
            Number(val) > 0 || 'Por favor ingrese un valor numérico positivo',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          flat
          type="reset"
          label="Reset"
          color="primary"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
