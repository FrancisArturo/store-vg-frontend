import { getProducts } from "../services/getProducts";
import {
	setCategories,
	setCurrentPage,
	setIsLoading,
	setProducts,
} from "../store/products/slice";
import { useAppDispatch } from "./store";
import { getCategories } from "../services/getCategories";

export const useProductsActions = () => {
	const dispatch = useAppDispatch();

	const getAllProducts = async (page: number, category?: string) => {
		console.log("llamada getAllProducts");
		dispatch(setIsLoading(true));
		const [err, products] = await getProducts(page, category);
		dispatch(setIsLoading(false));
		if (err) return console.error(err);
		if (products) {
			dispatch(setProducts(products));
		}
	};

	const getAllCategories = async () => {
		console.log("llamada getAllCategories");
		const [err, categories] = await getCategories();
		if (err) return console.error(err);
		if (categories) {
			dispatch(setCategories(categories));
		}
	};

	const handleCurrentPage = (value: number) => {
		dispatch(setCurrentPage(value));
	};

	return {
		getAllProducts,
		getAllCategories,
		handleCurrentPage,
	};
};
