import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
	{
		path: '/dashboard',
		component: () => import('@/modules/dashboard/layout/DashboardLayout.vue'),
		children: [
			{
				path: '',
				name: 'Dashboard',
				component: () => import('@/modules/dashboard/pages/HomePage.vue')
			},
			{
				path: 'products',
				name: 'Productos',
				component: () => import('@/modules/dashboard/pages/ProductsPage.vue')
			},
		]
	}
]
