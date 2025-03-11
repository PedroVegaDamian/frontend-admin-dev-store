<script setup lang="ts">
import { useFormCreateProduct } from '../composables/useFormCreateProduct';
import { categoryOptions } from '../constants';
import type { EmitClosedDialog, ProductDto } from '../interfaces/product';

interface Props {
  product: ProductDto
}

const props = defineProps<Props>();
console.log(props.product.name)
const emit = defineEmits<EmitClosedDialog>();


const { onSubmit, onReset, newProduct, errors } = useFormCreateProduct(emit, props.product)

</script>

<template>
  <div class="q-pa-md sm:w-[450px]" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled lazy-rules label="Nombre *" v-model="newProduct.name" hint="Agregar nombre de Producto"
        :error="!!errors.name" :error-message="errors.name" />

      <q-input filled label="Url Imagen *" v-model="newProduct.image" hint="Agregar un Link de imagen para el Producto"
        lazy-rules :error="!!errors.image" :error-message="errors.image" />

      <q-select label="Categoría" :options="categoryOptions" v-model="newProduct.category" :error="!!errors.category"
        :error-message="errors.category" />

      <q-input filled lazy-rules step="0.01" :min="0.01" type="number" label="Precio *" v-model="newProduct.price"
        :error="!!errors.price" :error-message="errors.price" />

      <q-input filled :min="1" lazy-rules type="number" label="Stock *" v-model="newProduct.stock"
        :error="!!errors.stock" :error-message="errors.stock" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn flat type="reset" label="Reset" color="primary" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
