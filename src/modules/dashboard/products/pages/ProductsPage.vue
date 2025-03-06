<script setup lang="ts">
  import ModalCreateProduct from "../components/ModalCreateProduct.vue";
  import ProductsList from "../components/ProductList.vue";
</script>

<template>
  <div class="flex justify-end mr-4">
    <ModalCreateProduct />
  </div>

  <ProductsList />
</template>
