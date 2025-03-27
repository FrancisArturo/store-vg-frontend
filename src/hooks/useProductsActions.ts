import { getProducts } from "../services/getProducts";
import {
	setCategories,
	setError,
	setHasNextPage,
	setIsLoading,
	setProducts,
	setProductSelected,
	setProductsScroll,
	setTotalProducts,
	setTotalProductsWithQuery,
} from "../store/products/slice";
import { useAppDispatch } from "./store";
import { getCategories } from "../services/getCategories";
import { useState } from "react";
import { getProduct } from "../services/getProduct";

export const useProductsActions = () => {
	const dispatch = useAppDispatch();
	const [prevCurrency, setPrevCurrency] = useState("");

	const getAllProducts = async (
		page: number,
		currency: string,
		category?: string,
		brand?: string,
		minPrice?: number,
		maxPrice?: number,
	) => {
		console.log("llamada getAllProducts");
		dispatch(setIsLoading(true));
		const [err, products, hasNextPage, totalProducts, totalProductsWithQuery] =
			await getProducts(page, currency, category, brand, minPrice, maxPrice);
		dispatch(setIsLoading(false));
		console.log(prevCurrency);

		if (err) return console.error(err);

		dispatch(setHasNextPage(hasNextPage as boolean));
		if (products && page !== 1 && prevCurrency === currency) {
			dispatch(setProductsScroll(products));
		}

		if (
			(products && page === 1) ||
			(products && prevCurrency.length !== 0 && prevCurrency !== currency)
		) {
			dispatch(setProducts(products));
		}

		if (totalProducts) dispatch(setTotalProducts(totalProducts));
		if (totalProductsWithQuery)
			dispatch(setTotalProductsWithQuery(totalProductsWithQuery));
		setPrevCurrency(currency);
	};

	const getProductSelected = async (pid: string) => {
		const [error, product] = await getProduct(pid);
		console.log(product);

		if (product) dispatch(setProductSelected(product));
		if (error) dispatch(setError(error));
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
		getProductSelected,
		getAllCategories,
	};
};
