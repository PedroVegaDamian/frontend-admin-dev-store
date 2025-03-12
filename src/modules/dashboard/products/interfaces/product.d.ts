export interface Product {
	_id: string
	image: string
	name: string
	category: Category
	price: number
	stock: number
	createdAt: Date
	updatedAt: Date
}

export type Category = 'cojines' | 'hombre' | 'mousepad' | ''

export type ProductDto = Partial<
	Omit<Product, '_id' | 'createdAt' | 'updatedAt'>
>

export type EmitClosedDialog = (e: 'closed-dialog') => void
