<script setup lang="ts">
  import { default as ProductCreateModal } from "@/shared/components/BaseModal.vue";
  import { ref } from "vue";
  import ProductForm from "../components/ProductForm.vue";
  import ProductsList from "../components/ProductList.vue";
  import { useFormCreateProduct } from "../composables/useFormCreateProduct";

  const isShowProductCreateModal = ref(false);
  const { newProduct, onReset, onSubmit } = useFormCreateProduct();

  const handleSubmit = async () => {
    await onSubmit();
    isShowProductCreateModal.value = false;
  };
</script>

<template>
  <div class="flex justify-end mr-4">
    <q-btn
      no-caps
      color="primary"
      label="Agregar Producto"
      @click="isShowProductCreateModal = true"
    />
    <ProductCreateModal
      @trigger-hide="onReset"
      v-model="isShowProductCreateModal"
    >
      <ProductForm
        @on-reset="onReset"
        @on-submit="handleSubmit"
        v-model="newProduct"
      />
    </ProductCreateModal>
  </div>

  <ProductsList />
</template>
