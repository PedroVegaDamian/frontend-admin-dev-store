<script setup lang="ts">

const getProducts = async () => {
  const response = await fetch("https://lexical-josey-pedrovega-df4ea41e.koyeb.app/api/products");
  const data = await response.json();
  console.log(data);
}

getProducts();
</script>

<template>
  <h2>Home Page - Dashboard</h2>
  <h2>Home Page - Dashboard</h2>
  <h2>Home Page - Dashboard</h2>
  <h2>Home Page - Dashboard</h2>
  <h2>Home Page - Dashboard</h2>
  <h2>Home Page - Dashboard</h2>
  <h2>Home Page - Dashboard</h2>
  <h3>Hola Mundo Vue</h3>
</template>