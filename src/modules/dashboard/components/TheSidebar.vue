<script setup lang="ts">
  import TheSidebarItems from "./TheSidebarItems.vue";

  interface Props {
    drawer: boolean;
    miniState: boolean;
  }

  interface Emits {
    (e: "update:miniState", value: boolean): void;
    (e: "update:drawer", value: boolean): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>

<template>
  <q-drawer
    bordered
    :width="200"
    show-if-above
    :breakpoint="500"
    :mini="props.miniState"
    :model-value="props.drawer"
    @mouseleave="emit('update:miniState', true)"
    @mouseenter="emit('update:miniState', false)"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list padding>
        <TheSidebarItems />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
