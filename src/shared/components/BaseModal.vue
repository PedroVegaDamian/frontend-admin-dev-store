<script setup lang="ts">
  type Emits = (e: "open-dialog") => void;
  interface Props {
    title: string;
  }

  const emit = defineEmits<Emits>();
  const props = defineProps<Props>();
  const showDialog = defineModel<boolean>();
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      no-caps
      color="primary"
      :label="props.title"
      @click="emit('open-dialog')"
    />

    <q-dialog v-model="showDialog" showkdrop-filter="blur(4px) saturate(150%)">
      <q-card>
        <slot />
      </q-card>
    </q-dialog>
  </div>
</template>
