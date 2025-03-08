<script setup lang="ts">
import BaseModal from "@/shared/components/ui/BaseModal.vue";
import ProductsList from "../components/ProductList.vue";
import FormCreateProduct from "../components/FormCreateProduct.vue";
import { ref } from "vue";

const showDialog = ref(false);

</script>

<template>
  <div class="flex justify-end mr-4">

    <BaseModal title="Nuevo Producto" v-model="showDialog" @open-dialog="showDialog = true">
      <FormCreateProduct @closed-dialog="showDialog = false" />
    </BaseModal>

  </div>

  <ProductsList />
</template>
