import { useQuasar } from "quasar"



export const toastNotification = (message: string, caption: string, color: string) => {
    const $q = useQuasar()
    $q.notify({
        message,
        caption,
        color
    })
}