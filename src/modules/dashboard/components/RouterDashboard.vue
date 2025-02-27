<script setup lang="ts">
const menuItems = [
    { label: "Home", icon: "home", route: "/dashboard" },
    { label: "Products", icon: "shopping_cart", route: "/dashboard/products" },
    { label: "test", icon: "star", route: "/dashboard/example" },
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
