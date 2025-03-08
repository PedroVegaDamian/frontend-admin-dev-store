<script setup lang="ts">

const showDialog = defineModel<boolean>()

interface Props {
    title: string
}

const props = defineProps<Props>();

type Emits = (e: "open-dialog") => void;

const emit = defineEmits<Emits>();

</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn no-caps color="primary" :label="props.title" @click="emit('open-dialog')" />

        <q-dialog v-model="showDialog" showkdrop-filter="blur(4px) saturate(150%)">
            <q-card>

                <slot />

            </q-card>
        </q-dialog>
    </div>
</template>
