<script setup lang="ts">
type Emits = (e: "open-dialog") => void;
interface Props {
  title?: string
  type: "button" | "icon"
  color: string
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const showDialog = defineModel<boolean>();
</script>

<template>
  <div class="q-pa-md q-gutter-sm">

    <!-- <q-btn no-caps color="primary" :icon="props.type == 'icon' ? props.title : undefined"
    :label="props.type == 'button' ? props.title : undefined" @click="emit('open-dialog')" /> -->

    <q-btn :flat="props.type == 'icon'" no-caps :color="props.color"
      :icon="props.type == 'icon' ? props.title : undefined" :label="props.type == 'button' ? props.title : undefined"
      @click="emit('open-dialog')" />

    <!-- <q-btn flat icon="edit" color="warning" @click="editProduct(props.row)" /> -->

    <q-dialog v-model="showDialog" showkdrop-filter="blur(4px) saturate(150%)">
      <q-card>
        <slot />
      </q-card>
    </q-dialog>
  </div>
</template>


<style lang="css">
.q-dialog__backdrop {
  background-color: rgba(0, 0, 0, 0.267) !important;
}
</style>