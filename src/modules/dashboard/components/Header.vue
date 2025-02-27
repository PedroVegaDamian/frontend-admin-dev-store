<script setup lang="ts">

  import { defineEmits } from 'vue'

  defineProps<{ drawer: boolean }>()

const emit = defineEmits(['update:drawer'])
</script>

<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
    <q-toolbar>
      <q-btn flat @click="emit('update:drawer', !drawer)" round dense icon="menu" />
      <q-toolbar-title>Header</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
