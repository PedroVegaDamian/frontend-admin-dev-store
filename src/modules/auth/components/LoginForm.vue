<script setup lang="ts">
import { useToastNotification } from '@/shared/composables/useToastNotification'
import { reactive } from 'vue'

const { toastNotification } = useToastNotification()

const credentials = reactive({
	email: '',
	password: ''
})

function onSubmit() {
	toastNotification({
		color: 'black',
		position: 'bottom-right',
		icon: 'check_circle_outline',
		message: 'Sesión Iniciada Correctamente'
	})
}
</script>

<template>
  <div className="w-full max-w-md">
    <div className="bg-white border border-gray-200 rounded-md p-8">
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-gray-900">Iniciar Sesión</p>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form @submit.prevent="onSubmit">
        <q-input outlined stack-label class="mb-3" color="black" label="Tu correo *" v-model="credentials.email" />

        <q-input outlined stack-label class="mb-6" color="black" type="password" label="Tu contraseña *"
          v-model="credentials.password" />

        <q-btn no-caps type="submit" color="black" style="width: 100%" label="Iniciar Sesión" />
      </form>
    </div>
  </div>
</template>
