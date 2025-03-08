<script setup lang="ts">
import { useToastNotification } from "@/shared/composables/useToastNotification";
import { ref } from "vue";
import { useProducts } from "../composables/useProducts";
import type { Category } from "../interfaces/product";

type Emits = (e: "closed-dialog") => void;

const emit = defineEmits<Emits>();

const name = ref<string>("");
const urlImage = ref<string>("");
const category = ref<Category | undefined>(undefined);
const price = ref<number>(0);
const stock = ref<number>(0);

const categoryOptions = ref<string[]>([]);

categoryOptions.value = Object.values({
  Cojines: "cojines",
  Hombre: "hombre",
  Mousepad: "mousepad",
});

const { toastNotification } = useToastNotification();

const { addOneProduct } = useProducts();

const onSubmit = async () => {
  const haveName = !!name.value?.trim();
  const haveUrlImage = !!urlImage.value?.trim();
  const haveCategory = !!category.value?.trim();
  const havePrice = price.value !== null && price.value > 0;
  const haveStock = stock.value !== null && stock.value > 0;

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

  const product = {
    name: name.value,
    image: urlImage.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
  };

  await addOneProduct(product);

  emit("closed-dialog");
};

const onReset = () => {
  name.value = "";
  urlImage.value = "";
};
</script>

<template>
  <div class="q-pa-md sm:w-[450px]" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="name" label="Nombre *" hint="Agregar nombre de Producto" lazy-rules :rules="[
        (val) => (val && val.length > 0) || 'Por favor tipear un nombre',
      ]" />

      <q-input filled v-model="urlImage" label="Url Imagen *" hint="Agregar un Link de imagen para el Producto"
        lazy-rules :rules="[
          (val) => (val && val.length > 0) || 'Por favor ingrese un link',
          (val) =>
            /^(https?:\/\/.*)$/.test(val) || 'Ingrese una URL válida de imagen',
        ]" />

      <q-select v-model="category" :options="categoryOptions" label="Categoría" />

      <q-input filled type="number" v-model="price" label="Precio *" lazy-rules :min="0.01" step="0.01" :rules="[
        (val) =>
          (val !== null && val !== '') || 'Por favor ingrese el precio',
        (val) => !isNaN(val) || 'Ingrese un número válido',
        (val) =>
          parseFloat(val) > 0 ||
          'Por favor ingrese un valor numérico positivo',
      ]" />

      <q-input filled type="number" v-model="stock" label="Stock *" lazy-rules :min="1" :rules="[
        (val) => (val !== null && val !== '') || 'Por favor ingrese el stock',
        (val) => !isNaN(val) || 'Ingrese un número válido',
        (val) =>
          Number(val) > 0 || 'Por favor ingrese un valor numérico positivo',
      ]" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
