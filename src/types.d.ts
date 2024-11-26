export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	categorySlug: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	logo: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviewsNumber: number;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Meta;
	images: string[];
	imagesSlider: string[];
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

export type ProductsRes = {
	docs: Product[];
	hasNextpage: boolean;
	hasPrevPage: boolean;
	limit: number;
	nextPage: number;
	page: number;
	pagingCounter: number;
	prevPage: number;
	totalDocs: number;
	totalPages: 4;
};

export type ApiGetProductsRes = {
	ok: boolean;
	products: ProductsRes;
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
	currentPage: number;
}
export interface CartStoreState {
	cartProducts: ProductInCart[];
	amount: number;
	isOpen: boolean;
}

export interface FiltersStoreState {
	minPrice: number;
	maxPrice: number;
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
