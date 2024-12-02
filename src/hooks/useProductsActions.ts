import { getProducts } from "../services/getProducts";
import {
	setCategories,
	setHasNextPage,
	setIsLoading,
	setProducts,
	setProductsScroll,
	setTotalProducts,
} from "../store/products/slice";
import { useAppDispatch } from "./store";
import { getCategories } from "../services/getCategories";

export const useProductsActions = () => {
	const dispatch = useAppDispatch();

	const getAllProducts = async (
		page: number,
		category?: string,
		brand?: string,
		minPrice?: number,
		maxPrice?: number,
	) => {
		console.log("llamada getAllProducts");
		dispatch(setIsLoading(true));
		const [err, products, hasNextPage, totalProducts] = await getProducts(
			page,
			category,
			brand,
			minPrice,
			maxPrice,
		);
		dispatch(setIsLoading(false));
		if (err) return console.error(err);
		dispatch(setHasNextPage(hasNextPage as boolean));
		if (products && page !== 1) {
			dispatch(setProductsScroll(products));
		}
		if (products && page === 1) {
			dispatch(setProducts(products));
		}
		if (totalProducts) dispatch(setTotalProducts(totalProducts));
	};

	const getAllCategories = async () => {
		console.log("llamada getAllCategories");
		const [err, categories] = await getCategories();
		if (err) return console.error(err);
		if (categories) {
			dispatch(setCategories(categories));
		}
	};

	return {
		getAllProducts,
		getAllCategories,
	};
};
