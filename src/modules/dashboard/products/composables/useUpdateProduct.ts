import { useToastNotification } from '@/shared/composables/useToastNotification'
import { useMutation } from '@pinia/colada'
import { watch } from 'vue'
import type { Product, ProductDto } from '../interfaces/product'
import { editProduct } from '../services'

interface UpdateProductParams {
	product: ProductDto
	_id: Product['_id']
}

export const useUpdateProduct = () => {
	const { mutateAsync: updateOneProduct, data: productUpdated } = useMutation({
		mutation: ({ product, _id }: UpdateProductParams) =>
			editProduct(product, _id)
	})

	const { toastNotification } = useToastNotification()

	watch(productUpdated, () => {
		if (productUpdated.value) {
			toastNotification({
				color: 'orange',
				message: `Producto Editado: ${productUpdated.value?.name}`
			})
		}
	})

	return { updateOneProduct, productUpdated }
}
