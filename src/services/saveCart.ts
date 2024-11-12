import type { CartStoreState } from "../types";

export const saveCartLocalStorage = (cart: CartStoreState) => {
	const data = JSON.stringify(cart);
	localStorage.setItem("cart", data);
};

export const getCartLocalStorage = (): CartStoreState => {
	const data = localStorage.getItem("cart");
	if (data) {
		return JSON.parse(data);
	}
	const defaultData = {
		cartProducts: [],
		amount: 0,
		isOpen: false,
	};
	return defaultData;
};
