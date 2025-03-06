<script setup lang="ts">
import ProductsList from "../components/ProductList.vue";
import ModalCreateProduct from "../components/ModalCreateProduct.vue";
</script>

<template>
  <div class="flex justify-end mr-4">
    <!-- <q-btn color="primary" no-caps>Nuevo Producto</q-btn> -->
    <ModalCreateProduct />
  </div>

  <ProductsList />
</template>
