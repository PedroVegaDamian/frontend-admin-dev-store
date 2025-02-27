import type { RouteRecordRaw } from 'vue-router'

export const productsRoutes: RouteRecordRaw[] = [
	{
		path: 'productos',
		component: () => import('@/modules/dashboard/products/pages/ProductsPage.vue'),
	}
]
