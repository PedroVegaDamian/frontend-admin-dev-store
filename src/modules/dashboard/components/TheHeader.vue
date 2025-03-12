<script setup lang="ts">
interface Props {
	drawer: boolean
}

type Emits = (e: 'update:drawer', drawer: boolean) => void

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="menu"
        @click="emit('update:drawer', !props.drawer)"
      />
      <q-toolbar-title>Dev Store</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
