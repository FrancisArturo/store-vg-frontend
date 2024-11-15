export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Meta;
	images: string[];
	thumbnail: string;
}

export interface Dimensions {
	width: number;
	height: number;
	depth: number;
}

export interface Meta {
	createdAt: Date;
	updatedAt: Date;
	barcode: string;
	qrCode: string;
}

export interface Review {
	rating: number;
	comment: string;
	date: Date;
	reviewerName: string;
	reviewerEmail: string;
}

export type ApiGetProductsRes = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};

export type CategoryFound = {
	title: string;
	quantity: number;
};

export type ApiGetCategoriesRes = {
	ok: boolean;
	categoriesFound: CategoryFound[];
};

export type ProductInCartId =
	`${string}-${string}-${string}-${string}-${string}`;

export interface ProductInCart {
	id: ProductInCartId;
	title: string;
	category: string;
	price: number;
	thumbnail: string;
	quantity: number;
	sku: string;
}

export interface ProductsStoreState {
	products: Product[];
	categories: CategoryFound[];
	isLoading: boolean;
}
export interface CartStoreState {
	cartProducts: ProductInCart[];
	amount: number;
	isOpen: boolean;
}

export interface FiltersStoreState {
	minPrice: number;
	brand: string;
}

export interface CheckoutData {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	date: string;
	products: ProductInCart[];
	total: number;
}

export interface Brand {
	title: string | undefined;
	quantity: number;
}
