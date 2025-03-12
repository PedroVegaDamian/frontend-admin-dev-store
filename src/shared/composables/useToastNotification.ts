import { type QNotifyCreateOptions, useQuasar } from 'quasar'

export const useToastNotification = () => {
	const $q = useQuasar()

	return {
		toastNotification: (options: QNotifyCreateOptions) => $q.notify(options)
	}
}
