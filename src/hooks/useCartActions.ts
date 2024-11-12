import {
	addQuantity,
	decreaseQuantity,
	deleteProductInCart,
	setAmount,
	setIsOpen,
	setProductInCart,
} from "../store/cart/slice";
import type { Product, ProductInCart, ProductInCartId } from "../types";
import { useAppDispatch } from "./store";

export const useCartActions = () => {
	const dispatch = useAppDispatch();

	const addProductToCart = (product: Product) => {
		if (!product) throw new Error("Product not found");
		const newProduct = {
			id: crypto.randomUUID(),
			title: product.title,
			category: product.category,
			price: product.price,
			thumbnail: product.thumbnail,
			quantity: 1,
			sku: product.sku,
		};
		dispatch(setProductInCart(newProduct));
	};

	const deleteCartProduct = (id: ProductInCartId) => {
		if (!id) return;
		dispatch(deleteProductInCart(id));
	};

	const addQuantityProduct = (id: ProductInCartId) => {
		dispatch(addQuantity(id));
	};

	const decreaseQuantityProduct = (id: ProductInCartId) => {
		dispatch(decreaseQuantity(id));
	};

	const setCartAmount = (cart: ProductInCart[]) => {
		dispatch(setAmount(cart));
	};
	const setIsOpenCart = (value: boolean) => {
		dispatch(setIsOpen(value));
	};

	return {
		addProductToCart,
		deleteCartProduct,
		addQuantityProduct,
		decreaseQuantityProduct,
		setCartAmount,
		setIsOpenCart,
	};
};
