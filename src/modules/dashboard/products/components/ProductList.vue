<script setup lang="ts">
  import { default as ProductUpdateModal } from "@/shared/components/BaseModal.vue";
  import { type QTableProps, date } from "quasar";
  import { reactive } from "vue";
  import { ref } from "vue";
  import { useProducts } from "../composables/useProducts";
  import { defaultProductDto } from "../constants";
  import type { Product, ProductDto } from "../interfaces/product";
  import ProductForm from "./ProductForm.vue";

  const {
    error,
    products,
    isLoading,
    pagination,
    updateOneProduct,
    deleteOneProduct,
  } = useProducts();

  const columns: QTableProps["columns"] = [
    {
      name: "_id",
      label: "ID",
      field: "_id",
      align: "center",
    },
    {
      name: "image",
      label: "Imagen",
      field: "image",
      align: "center",
    },
    {
      name: "name",
      label: "Nombre",
      field: "name",
      align: "center",
      sortable: true,
    },
    {
      name: "category",
      label: "Categoria",
      field: "category",
      align: "center",
      sortable: true,
    },
    {
      name: "price",
      label: "Precio",
      field: "price",
      align: "center",
      sortable: true,
      format: (val) =>
        new Intl.NumberFormat("es-PE", {
          style: "currency",
          currency: "PEN",
        }).format(val),
    },
    {
      name: "stock",
      label: "Stock",
      field: "stock",
      align: "center",
      sortable: true,
    },
    {
      name: "createdAt",
      label: "Fecha Creación",
      field: "createdAt",
      align: "center",
      format: (val) => date.formatDate(val, "DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "updatedAt",
      label: "Fecha Actualización",
      field: "updatedAt",
      align: "center",
      format: (val) => date.formatDate(val, "DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "actions",
      label: "Acciones",
      field: "actions",
      align: "center",
    },
  ];

  const showProductUpdateModal = ref(false);
  const editIdProduct = ref<Product["_id"]>("");
  const editProduct = reactive<Required<ProductDto>>({ ...defaultProductDto });

  const fillingProductData = (product: Product) => {
    showProductUpdateModal.value = true;
    const { _id, createdAt, updatedAt, ...rest } = product;
    editIdProduct.value = _id;
    Object.assign(editProduct, rest);
  };

  const onSubmit = async () => {
    await updateOneProduct({
      product: { ...editProduct },
      _id: editIdProduct.value,
    });
    showProductUpdateModal.value = false;
  };

  const onReset = () => {
    Object.assign(editProduct, defaultProductDto);
  };

  const visibleColumns = columns
    .map((column) => column.name)
    .filter((column) => column !== "_id");
</script>

<template>
  <div class="q-pa-md">
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <q-table
      class="my-sticky-last-column-table"
      row-key="_id"
      title="Productos"
      :columns="columns"
      :loading="isLoading"
      separator="vertical"
      :rows="products.data"
      v-model:pagination="pagination"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[5, 10, 20, 50]"
      @request="
        (props) => {
          pagination.page = props.pagination.page;
          pagination.rowsPerPage = props.pagination.rowsPerPage;
        }
      "
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:body-cell-image="props">
        <td class="text-center">
          <q-avatar>
            <img
              width="48"
              height="48"
              :src="props.value"
              :alt="props.row.name"
            />
          </q-avatar>
        </td>
      </template>

      <template v-slot:body-cell-actions="props">
        <td class="text-center">
          <q-btn
            flat
            icon="edit"
            color="warning"
            @click="fillingProductData(props.row)"
          />
          <q-btn
            flat
            icon="delete"
            color="negative"
            @click="deleteOneProduct(props.row._id)"
          />
        </td>
      </template>
    </q-table>

    <ProductUpdateModal
      @trigger-hide="onReset"
      v-model="showProductUpdateModal"
    >
      <ProductForm
        @on-reset="onReset"
        @on-submit="onSubmit"
        v-model="editProduct"
        color-buttons="orange"
        label-button="Actualizar"
      />
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
