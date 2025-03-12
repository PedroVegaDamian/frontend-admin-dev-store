import { reactive, ref } from 'vue'
import { defaultProductDto } from '../constants'
import type { Product, ProductDto } from '../interfaces/product'
import { useProducts } from './useProducts'

export const useFormEditProduct = () => {
	const editProduct = reactive<Required<ProductDto>>({ ...defaultProductDto })
	const editIdProduct = ref<Product['_id']>('')

	const { updateOneProduct } = useProducts()

	const fillingProductData = (product: Product) => {
		const { _id, createdAt, updatedAt, ...rest } = product
		editIdProduct.value = _id
		Object.assign(editProduct, rest)
	}

	const onSubmit = async () => {
		await updateOneProduct({
			product: { ...editProduct },
			_id: editIdProduct.value
		})
	}

	const onReset = () => {
		Object.assign(editProduct, defaultProductDto)
	}

	return {
		onSubmit,
		onReset,
		editProduct,
		fillingProductData
	}
}
