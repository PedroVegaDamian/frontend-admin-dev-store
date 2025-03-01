<script setup lang="ts">
  import { paths } from "@/shared/router/paths";

  const menuItems = [
    { label: "Inicio", icon: "home", route: paths.dashboard.home },
    {
      label: "Productos",
      icon: "shopping_cart",
      route: paths.dashboard.products,
    },
  ];
</script>

<template>
  <q-list>
    <q-item
      exact
      v-ripple
      clickable
      :to="item.route"
      :key="item.route"
      v-for="item in menuItems"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        {{ item.label }}
      </q-item-section>
    </q-item>
  </q-list>
</template>
