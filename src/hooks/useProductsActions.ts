import { getProducts } from "../services/getProducts";
import {
	setCategories,
	setIsLoading,
	setProducts,
} from "../store/products/slice";
import { useAppDispatch } from "./store";
import { getCategories } from "../services/getCategories";

export const useProductsActions = () => {
	const dispatch = useAppDispatch();

	const getAllProducts = async () => {
		console.log("llamada getAllProducts");
		dispatch(setIsLoading(true));
		const [err, products] = await getProducts();
		dispatch(setIsLoading(false));
		if (err) return console.error(err);
		if (products) {
			dispatch(setProducts(products));
		}
	};

	const getAllCategories = async () => {
		console.log("llamaada getAllCategories");
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
