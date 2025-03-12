import { computed, ref, watch } from 'vue'

import { useCreateProduct } from './useCreateProduct'
import { useDeleteProduct } from './useDeleteProduct'
import { useGetProducts } from './useGetProducts'
import { useUpdateProduct } from './useUpdateProduct'

const pagination = ref({
	page: 1,
	rowsNumber: 0,
	rowsPerPage: 5
})

export const useProducts = () => {
	const queryParams = computed(() => ({
		limit: pagination.value.rowsPerPage,
		offset: (pagination.value.page - 1) * pagination.value.rowsPerPage
	}))

	const { error, isLoading, products, refresh } = useGetProducts(queryParams)
	const { createProduct, productCreated } = useCreateProduct()
	const { updateOneProduct, productUpdated } = useUpdateProduct()
	const { deleteProduct, productDeleted } = useDeleteProduct()

	// TODO: refactorizar y legibilizar
	watch(
		() => [
			products.value.data,
			productDeleted.value,
			productCreated.value,
			productUpdated.value
		],
		async () => {
			await refresh()
			if (!products.value.total) return
			pagination.value.rowsNumber = products.value.total
		}
	)

	return {
		error,
		products,
		isLoading,
		pagination,
		updateOneProduct,
		addOneProduct: createProduct,
		deleteOneProduct: deleteProduct
	}
}
