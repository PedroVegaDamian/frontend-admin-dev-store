import type { RouteRecordRaw } from 'vue-router'
import { productsRoutes } from '../products/routes'

export const dashboardRoutes: RouteRecordRaw[] = [
	{
		path: '/dashboard',
		component: () => import('@/modules/dashboard/layout/DashboardLayout.vue'),
		children: [
			{
				path: '',
				name: 'dashboard',
				component: () => import('@/modules/dashboard/pages/HomePage.vue')
			},
			...productsRoutes
		]
	}
]
