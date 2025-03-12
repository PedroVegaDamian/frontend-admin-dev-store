<script setup lang="ts">
type Emits = (e: 'trigger-hide') => void

const emit = defineEmits<Emits>()
const showDialog = defineModel<boolean>()
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="showDialog" @hide="emit('trigger-hide')">
      <q-card>
        <slot />
      </q-card>
    </q-dialog>
  </div>
</template>
