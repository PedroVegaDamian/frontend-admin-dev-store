<script setup lang="ts">
import { ref } from 'vue'
import FormCreateProduct from './FormCreateProduct.vue'

// const showDialog = ref(false)
const backdropFilter = ref<string | null>(null)
const label = ref("")
const showDialog = ref(false)

backdropFilter.value = 'blur(4px) saturate(150%)'
label.value = "Nuevo Producto"

const handleClick = (e: Event) => {
    e.preventDefault()
    openDialog();
}

const openDialog = () => { showDialog.value = true }

const closedDialog = () => { showDialog.value = false }

</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" :label="label" no-caps @click="handleClick" />

        <q-dialog v-model="showDialog" :backdrop-filter="backdropFilter!">

            <q-card>
                <FormCreateProduct @closed-dialog="closedDialog" />
            </q-card>
        </q-dialog>
    </div>
</template>
