<script setup lang="ts">
import { default as ProductUpdateModal } from "@/shared/components/BaseModal.vue";
import { ref } from "vue";
import { useProducts } from "../composables/useProducts";
import { columns } from "../constants";
import ProductForm from "./ProductForm.vue";
import { useFormEditProduct } from "../composables/useFormEditProduct";

const {
  error,
  products,
  isLoading,
  pagination,
  deleteOneProduct,
} = useProducts();

const showProductUpdateModal = ref(false);

const { onReset, onSubmit, editProduct, fillingProductData } = useFormEditProduct();

const visibleColumns = columns!
  .map((column) => column.name)
  .filter((column) => column !== "_id");

const handleSubmit = async () => {
  await onSubmit();
  showProductUpdateModal.value = false;
};

</script>

<template>
  <div class="q-pa-md">
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <q-table class="my-sticky-last-column-table" row-key="_id" title="Productos" :columns="columns" :loading="isLoading"
      separator="vertical" :rows="products.data" v-model:pagination="pagination" :visible-columns="visibleColumns"
      :rows-per-page-options="[5, 10, 20, 50]" @request="
        (props) => {
          pagination.page = props.pagination.page;
          pagination.rowsPerPage = props.pagination.rowsPerPage;
        }
      ">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:body-cell-image="props">
        <td class="text-center">
          <q-avatar>
            <img width="48" height="48" :src="props.value" :alt="props.row.name" />
          </q-avatar>
        </td>
      </template>

      <template v-slot:body-cell-actions="props">
        <td class="text-center">
          <q-btn flat icon="edit" color="warning"
            @click="fillingProductData(props.row), showProductUpdateModal = true" />
          <q-btn flat icon="delete" color="negative" @click="deleteOneProduct(props.row._id)" />
        </td>
      </template>
    </q-table>

    <ProductUpdateModal @trigger-hide="onReset" v-model="showProductUpdateModal">
      <ProductForm @on-reset="onReset" @on-submit="handleSubmit" v-model="editProduct" color-buttons="orange"
        label-button="Actualizar" />
    </ProductUpdateModal>
  </div>
</template>

<style lang="css">
@media screen and (max-width: 778px) {
  .my-sticky-last-column-table {
    max-width: 1000px;
  }
}

.my-sticky-last-column-table thead tr:last-child th:last-child {
  background-color: #fff;
}

.my-sticky-last-column-table td:last-child {
  background-color: #fff;
}

.my-sticky-last-column-table th:last-child,
.my-sticky-last-column-table td:last-child {
  position: sticky;
  right: 0;
  left: 0;
  z-index: 1;
  flex-wrap: nowrap;
}
</style>
