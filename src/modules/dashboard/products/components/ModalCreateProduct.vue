<script setup lang="ts">
  import { ref } from "vue";
  import FormCreateProduct from "./FormCreateProduct.vue";

  const showDialog = ref(false);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      no-caps
      color="primary"
      label="Nuevo Producto"
      @click="showDialog = true"
    />

    <q-dialog v-model="showDialog" backdrop-filter="blur(4px) saturate(150%)">
      <q-card>
        <FormCreateProduct
          @closed-dialog="
            () => {
              showDialog = false;
            }
          "
        />
      </q-card>
    </q-dialog>
  </div>
</template>
