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
import { useState } from "react";

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
		const [err, products, hasNextPage, totalProducts] = await getProducts(
			page,
			currency,
			category,
			brand,
			minPrice,
			maxPrice,
		);
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
		setPrevCurrency(currency);
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
