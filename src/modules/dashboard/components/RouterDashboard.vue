<script setup lang="ts">
const menuItems = [
    { label: "Dashboard", icon: "home", route: "/dashboard" },
    { label: "Productos", icon: "shopping_cart", route: "/dashboard/products" },
];
</script>

<template>
    <q-list>
        <q-item exact v-for="item in menuItems" :key="item.route" clickable v-ripple :to="item.route">
            <q-item-section avatar>
                <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
                {{ item.label }}
            </q-item-section>
        </q-item>
    </q-list>
</template>
