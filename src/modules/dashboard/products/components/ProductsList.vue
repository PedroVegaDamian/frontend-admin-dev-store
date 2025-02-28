<script setup lang="ts">

import { onMounted, ref } from 'vue';

const dataProducts = ref([]);

const getProducts = async () => {
    const response = await fetch("https://lexical-josey-pedrovega-df4ea41e.koyeb.app/api/products");
    const data = await response.json();
    console.log(data);
    return data;
}

onMounted(async () => {
    const data = await getProducts();
    dataProducts.value = data;
})


const columns = [
    {
        name: 'name',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: (row: any) => row.name,
        format: (val: string) => `${val}`,
        sortable: true
    },

    { name: 'category', align: 'center', label: 'Categoria', field: 'category', sortable: true },
    // { name: 'cojines', label: 'Cojines', field: 'fat', sortable: true },
    { name: 'createdAt', label: 'Fecha', field: 'createdAt' },
    // { name: 'image', label: '', field: 'protein' },
    { name: 'price', label: 'Precio', field: 'price' },
    { name: 'stock', label: 'Stock', field: 'stock', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'updatedAt', label: 'Fecha Actualización', field: 'updatedAt', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]


</script>

<template>
    <div class="q-pa-md">
        <q-table class="my-sticky-last-column-table" flat bordered title="Treats" :rows="dataProducts"
            :columns="columns" row-key="name" />
    </div>
</template>


<style>
.my-sticky-last-column-table {
    /* specifying max-width so the example can
highlight the sticky column on any browser window */
    max-width: 600px;
}

.my-sticky-last-column-table thead tr:last-child th:last-child {
    /* bg color is important for th; just specify one */
    background-color: #00b4ff;
}

.my-sticky-last-column-table td:last-child {
    background-color: #00b4ff;
}

.my-sticky-last-column-table th:last-child,
.my-sticky-last-column-table td:last-child {
    position: sticky;
    right: 0;
    z-index: 1;
}
</style>