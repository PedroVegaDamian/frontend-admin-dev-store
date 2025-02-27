<script setup lang="ts">

defineProps<{ drawer: boolean }>()

const emit = defineEmits(['update:drawer'])
</script>

<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
    <q-toolbar>
      <q-btn flat @click="emit('update:drawer', !drawer)" round dense icon="menu" />
      <q-toolbar-title>Dev Store</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
