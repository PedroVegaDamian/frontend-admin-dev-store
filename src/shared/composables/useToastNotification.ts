import { useQuasar, type QNotifyCreateOptions } from "quasar";

export const useToastNotification = () => {
  const $q = useQuasar();

  return {
    toastNotification: (options: QNotifyCreateOptions) => $q.notify(options),
  };
};
