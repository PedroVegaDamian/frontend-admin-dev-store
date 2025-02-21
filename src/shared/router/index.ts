import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes } from '@/modules/auth/routes'
import { dashboardRoutes } from '@/modules/dashboard/routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...authRoutes, ...dashboardRoutes]
})

export default router
