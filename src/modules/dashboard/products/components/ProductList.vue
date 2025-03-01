<script setup lang="ts">
  import { date, type QTableProps } from "quasar";
  import { useProducts } from "../composables/useProducts";

  const { products, editProduct, deleteProductById } = useProducts();

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

  const visibleColumns = columns
    .map((column) => column.name)
    .filter((column) => column !== "_id");
</script>

<template>
  <div class="q-pa-md">
    <q-table
      row-key="_id"
      title="Productos"
      :rows="products"
      :loading="false"
      :columns="columns"
      :visible-columns="visibleColumns"
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
            @click="editProduct(props.row)"
          />
          <q-btn
            flat
            icon="delete"
            color="negative"
            @click="deleteProductById(props.row._id)"
          />
        </td>
      </template>
    </q-table>
  </div>
</template>
