<template>
  <main class="flex justify-center items-center h-screen bg-screen-image">
    <RouterView />
  </main>
</template>

<style scoped>
  .bg-screen-image {
    background-image: url("@/shared/assets/bg-screen.svg");
    background-size: cover;
    background-position: center;
  }
</style>
