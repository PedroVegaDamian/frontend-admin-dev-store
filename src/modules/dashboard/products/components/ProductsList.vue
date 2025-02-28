<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getProducts } from "../services";
import { date, useQuasar, type QTableProps } from "quasar";
import type { Product } from "../interfaces/product";

import { toastNotification } from "@/shared/utils/toastNotification";


const $q = useQuasar()

const dataProducts = ref<Product[]>([]);

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
    .map((col) => col.name)
    .filter((col) => col !== "_id");

const handleEditProduct = (product: Product) => {
    console.log({ ...product });
};

const handleDeleteProduct = (productId: Product["_id"]) => {
    const filterProduct: Product[] = dataProducts.value.filter(item => item._id !== productId)

    dataProducts.value = filterProduct

    toastNotification("Producto Eliminado", "test", "primary");
    const showNotif = () => {
        $q.notify({
            message: "Eliminado Correctamente",
            caption: "",
            color: "danger"
        })
    }

    // showNotif();
};

onMounted(async () => {
    const products = await getProducts();
    dataProducts.value = products;
});
</script>

<template>
    <div class="q-pa-md">
        <q-table row-key="_id" title="Productos" :columns="columns" :rows="dataProducts"
            :visible-columns="visibleColumns">
            <template v-slot:body-cell-image="props">
                <td class="text-center">
                    <q-avatar>
                        <img :src="props.value" :alt="props.row.name" />
                    </q-avatar>
                </td>
            </template>
            <template v-slot:body-cell-actions="props">
                <td class="text-center">
                    <q-btn flat icon="edit" color="warning" @click="handleEditProduct(props.row._id)" />
                    <q-btn flat icon="delete" color="negative" @click="handleDeleteProduct(props.row._id)" />
                </td>
            </template>
        </q-table>
    </div>
</template>
