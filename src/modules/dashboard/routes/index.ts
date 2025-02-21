import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
	{
		path: '/dashboard',
		component: () => import('@/modules/dashboard/layout/DashboardLayout.vue'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/modules/dashboard/pages/Home.vue')
			}
		]
	}
]
