<script setup lang="ts">
import type { QBtnProps } from "quasar";
import { categoryOptions } from "../constants";
import type { ProductDto } from "../interfaces/product";

interface Props {
  labelButton?: QBtnProps["label"];
  colorButtons?: QBtnProps["color"];
}

interface Emits {
  (e: "on-submit"): void;
  (e: "on-reset"): void;
}

const props = withDefaults(defineProps<Props>(), {
  labelButton: "Guardar",
  colorButtons: "primary",
});
const emit = defineEmits<Emits>();
const product = defineModel<ProductDto>({ required: true });
</script>

<template>
  <div class="q-pa-md sm:w-[450px]" style="max-width: 400px">
    <q-form class="q-gutter-md" @reset="emit('on-reset')" @submit="emit('on-submit')">
      <q-input filled lazy-rules label="Nombre *" v-model="product.name" hint="Agregar nombre de Producto" />

      <q-input filled lazy-rules label="Url Imagen *" v-model="product.image"
        hint="Agregar un Link de imagen para el Producto" />

      <q-select label="Categoría" :options="categoryOptions" v-model="product.category" />

      <q-input filled lazy-rules step="0.01" :min="0.01" type="number" label="Precio *" v-model="product.price" />

      <q-input filled :min="1" lazy-rules type="number" label="Stock *" v-model="product.stock" />

      <div>
        <q-btn no-caps type="submit" :label="props.labelButton" :color="props.colorButtons" />
        <q-btn no-caps outline type="reset" label="Resetar" class="q-ml-sm" :color="props.colorButtons" />
      </div>
    </q-form>
  </div>
</template>
