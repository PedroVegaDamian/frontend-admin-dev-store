import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
	{
		path: '',
		component: () => import('@/modules/auth/layout/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'login',
				component: () => import('@/modules/auth/pages/LoginPage.vue')
			}
		]
	}
]
