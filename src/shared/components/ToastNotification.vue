<script setup lang="ts">
import { useQuasar } from 'quasar'

interface ToastNotificationProps {
    message: string,
    caption: string,
    color: string
}

const { message, caption, color } = defineProps<ToastNotificationProps>()


const $q = useQuasar()

const showNotif = () => {
    $q.notify({
        message,
        caption,
        color
    })
}

</script>

<template>
    <div class="q-pa-md">
        <q-btn color="purple" @click="showNotif" label="Show with caption" />
    </div>
</template>
