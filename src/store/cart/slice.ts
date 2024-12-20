import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
	CartStoreState,
	ProductInCart,
	ProductInCartId,
} from "../../types";
import { getCartLocalStorage } from "../../services/cartLocalStorage";

export const cartSlice = createSlice({
	name: "cart",
	initialState: getCartLocalStorage() as CartStoreState,
	reducers: {
		setProductInCart: (state, action: PayloadAction<ProductInCart>) => {
			state.cartProducts.push(action.payload);
		},
		deleteProductInCart: (state, action: PayloadAction<ProductInCartId>) => {
			state.cartProducts = state.cartProducts.filter(
				(product) => product.id !== action.payload,
			);
		},
		addQuantity: (state, action: PayloadAction<ProductInCartId>) => {
			state.cartProducts = state.cartProducts.map((product) => {
				if (product.id === action.payload) {
					return {
						...product,
						quantity: product.quantity + 1,
					};
				}
				return product;
			});
		},
		decreaseQuantity: (state, action: PayloadAction<ProductInCartId>) => {
			state.cartProducts = state.cartProducts.map((product) => {
				if (product.id === action.payload) {
					return {
						...product,
						quantity: product.quantity - 1,
					};
				}
				return product;
			});
		},
		setAmountUsd: (state, action: PayloadAction<ProductInCart[]>) => {
			const itemValues = action.payload.map((item) => {
				return item.price.usd * item.quantity;
			});
			state.amount = Number(itemValues.reduce((a, b) => a + b, 0).toFixed(2));
		},
		setAmountEur: (state, action: PayloadAction<ProductInCart[]>) => {
			const itemValues = action.payload.map((item) => {
				return item.price.eur * item.quantity;
			});
			state.amount = Number(itemValues.reduce((a, b) => a + b, 0).toFixed(2));
		},
		setIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const {
	setProductInCart,
	deleteProductInCart,
	setIsOpen,
	addQuantity,
	decreaseQuantity,
	setAmountUsd,
	setAmountEur,
} = cartSlice.actions;
