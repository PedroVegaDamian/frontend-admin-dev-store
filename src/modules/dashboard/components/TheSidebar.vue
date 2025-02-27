<script setup lang="ts">
import RouterDashboard from './RouterDashboard.vue';

defineProps<{ drawer: boolean, miniState: boolean, opacity?: string }>()

const emit = defineEmits(['update:miniState', 'update:drawer'])
</script>

<template>
  <q-drawer :model-value="drawer" show-if-above :mini="miniState" @mouseenter="emit('update:miniState', false)"
    @mouseleave="emit('update:miniState', true)" :width="200" :breakpoint="500" bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list padding>

        <RouterDashboard />

      </q-list>
    </q-scroll-area>
  </q-drawer>

</template>