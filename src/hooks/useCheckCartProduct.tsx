import type { Product } from "../types";
import { useAppSelector } from "./store";

export const useCheckCartProduct = () => {
	const { cartProducts } = useAppSelector((state) => state.cart);

	const isProductInCart = (product: Product) => {
		return cartProducts.some((item) => item.sku === product.sku);
	};

	return {
		isProductInCart,
	};
};
